# Security policy

## Reporting a vulnerability
Please **do not** open a public issue for security problems. Email the maintainer or use GitHub's
private "Report a vulnerability" option on the Security tab, and include steps to reproduce.
You will get a reply as soon as possible.

## What is already protected
- Prices, discounts, stock and reward coins are calculated and checked on the server.
- Passwords are hashed with bcrypt; password reset and email confirmation use single-use, expiring, hashed tokens.
- Admin access is checked against the database role on every admin request.
- Uploads are validated by file signature (JPG, PNG, WebP only).
- Rate limiting on sign-in, sign-up, orders, reviews, contact and tracking.
- Security headers are set in `next.config.ts`.

## Deployment reminders
- Never commit `.env.local`. Rotate any secret that was shared by accident.
- Use a strong `NEXTAUTH_SECRET` and restrict the database user to this project.
