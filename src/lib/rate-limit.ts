/**
 * Rate limiter for login, signup, orders, reviews and similar endpoints.
 *
 * - Without configuration it counts in memory (one server instance).
 * - With UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN it counts in
 *   Upstash Redis, so limits are shared by every server instance.
 */
const hits = new Map<string, number[]>();

function memoryLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}

async function redisLimit(key: string, limit: number, windowMs: number): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const seconds = Math.ceil(windowMs / 1000);
    const redisKey = `rl:${key}`;
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", redisKey],
        ["EXPIRE", redisKey, seconds, "NX"],
      ]),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: number }[];
    const count = Number(data?.[0]?.result);
    return Number.isFinite(count) ? count <= limit : null;
  } catch {
    return null; // fall back to memory if Redis is unreachable
  }
}

/** Returns true when the request is allowed. */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const shared = await redisLimit(key, limit, windowMs);
  return shared ?? memoryLimit(key, limit, windowMs);
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

export const tooManyRequests = () =>
  Response.json({ error: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });
