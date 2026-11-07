# Contributing

## Workflow
1. Create a branch from `main`: `feat/<name>`, `fix/<name>`, `docs/<name>` or `chore/<name>`.
2. Make small, focused commits using [Conventional Commits](https://www.conventionalcommits.org):
   `feat(cart): add free-delivery progress bar`, `fix(orders): reject unknown payment methods`.
3. Run `npm run build` before you push.
4. Open a pull request using the template and merge it into `main`.

## Code style
- TypeScript everywhere; prefer small components and shared helpers in `src/lib`.
- Comments in English, explaining *why* rather than *what*.
- Anything the shop owner should change without coding belongs in the admin settings, not in the source.
- Never trust the browser: validate and recalculate on the server.

## Local setup
See [SETUP-GUIDE.md](./SETUP-GUIDE.md).
