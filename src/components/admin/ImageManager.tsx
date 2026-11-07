"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Link2, Star, Trash2, Upload } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

const MAX_IMAGES = 8;
const MAX_SIDE = 1200;

/** Shrinks a photo in the browser (max 1200px, WebP/JPEG) so uploads stay small and fast. */
async function compress(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not process this image");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const toBlob = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.85));
  const webp = await toBlob("image/webp");
  if (webp && webp.type === "image/webp") return webp;
  const jpeg = await toBlob("image/jpeg");
  if (!jpeg) throw new Error("Could not convert this image");
  return jpeg;
}

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  fallbackSlug?: string;
}

/** Add product images by uploading from the computer/phone gallery or by pasting a link. */
export default function ImageManager({ images, onChange, fallbackSlug }: ImageManagerProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [linkInput, setLinkInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const room = MAX_IMAGES - images.length;

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    const added: string[] = [];
    try {
      for (const file of Array.from(files).slice(0, room)) {
        if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image`);
        const blob = await compress(file);
        const body = new FormData();
        body.append("file", blob, "upload");
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Upload failed");
        added.push(data.url);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      // Keep whatever uploaded successfully, even if a later file failed
      if (added.length) onChange([...images, ...added]);
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addLink = () => {
    const url = linkInput.trim();
    setError("");
    if (!/^(https:\/\/|\/)/.test(url)) {
      setError("Links must start with https:// (or / for a file in the public folder)");
      return;
    }
    if (images.includes(url)) {
      setError("This image is already added");
      return;
    }
    if (room <= 0) {
      setError(`You can add up to ${MAX_IMAGES} images`);
      return;
    }
    onChange([...images, url]);
    setLinkInput("");
  };

  const makeMain = (index: number) =>
    onChange([images[index], ...images.filter((_, i) => i !== index)]);

  return (
    <div className="space-y-4">
      {images.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((src, i) => (
            <li key={`${src}-${i}`} className="group relative aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <ProductImage src={src} alt={`Product image ${i + 1}`} fallbackSlug={fallbackSlug} sizes="160px" />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold text-gold-ink">
                  Main
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-linear-to-t from-black/60 to-transparent p-2">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeMain(i)}
                    aria-label="Make main image"
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-stone-700 hover:text-gold-700 cursor-pointer"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onChange(images.filter((_, j) => j !== i))}
                  aria-label="Remove image"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-stone-700 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid place-items-center rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center text-sm text-stone-500">
          <ImagePlus className="mb-2 h-8 w-8 text-stone-400" />
          No images yet. The store will show an illustration until you add one.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={(e) => upload(e.target.files)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy || room <= 0}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
        >
          <Upload className="h-4 w-4" />
          {busy ? "Uploading..." : "Upload from device"}
        </button>

        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLink();
                }
              }}
              placeholder="Or paste an image link (https://...)"
              className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-9 pr-3 text-sm text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            />
          </div>
          <button
            type="button"
            onClick={addLink}
            className="rounded-full border-2 border-stone-300 px-4 text-sm font-bold text-stone-700 transition hover:border-gold-500 cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      <p className="text-xs text-stone-500">
        JPG, PNG or WebP. Photos are resized automatically. The first image is the main one (up to {MAX_IMAGES}).
      </p>
      {error && (
        <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}
