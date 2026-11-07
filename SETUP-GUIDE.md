# Setup guide (step by step)

Follow these steps in order. Everything marked **required** is needed for the store to work.

## 0. What you need installed
- **Node.js 20.9 or newer** (https://nodejs.org, choose LTS). Check with `node -v`.
- A code editor (VS Code) and a terminal.

## 1. Install and start
```bash
cd mewazar
npm install
cp .env.example .env.local      # Windows PowerShell: Copy-Item .env.example .env.local
```
The `npm warn` messages about eslint, vulnerabilities or `allow-scripts` are normal. Ignore them (do not run `npm audit fix --force`).

## 2. MongoDB Atlas (required: the database)
1. Create a free account at https://www.mongodb.com/atlas and create a free **M0** cluster.
2. **Database Access** > Add a database user (username + password). Save the password.
3. **Network Access** > Add IP address > **Allow access from anywhere** (`0.0.0.0/0`). Needed for Vercel and your laptop.
4. **Database** > Connect > Drivers > copy the connection string. Put your password in it and add a database name:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/mewazar?retryWrites=true&w=majority`
5. Paste it as `MONGODB_URI` in `.env.local`.
   If the password has special characters (`@ : / ?`), URL-encode them.

## 3. NextAuth secret (required)
Generate a random secret and set it as `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```
(No openssl on Windows? Use any 32+ character random string.)
Set `NEXTAUTH_URL=http://localhost:3000` and `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for now.

## 4. Google sign-in (required for the admin login)
1. https://console.cloud.google.com > create a project > **APIs & Services** > **OAuth consent screen** (External, fill the basics).
2. **Credentials** > Create credentials > **OAuth client ID** > Web application.
3. Authorised redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://YOUR-DOMAIN/api/auth/callback/google` (add after you deploy)
4. Copy the Client ID and Client secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 5. GitHub sign-in (optional)
GitHub > Settings > Developer settings > OAuth Apps > New. Callback URL:
`http://localhost:3000/api/auth/callback/github` (add the live one later). Put the ID and secret in `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
If you skip it, remove the GitHub button or leave it unused.

## 6. Admin access (required)
Set `ADMIN_EMAILS=your@gmail.com` (the exact email of the Google/GitHub account you will sign in with).
Admins must sign in with Google or GitHub, never with a password.

## 7. Email with Resend (recommended)
Used for order confirmations, status updates, password reset and email confirmation.
1. Sign up at https://resend.com and create an API key: `RESEND_API_KEY`.
2. Verify your domain in Resend, then set `EMAIL_FROM=Mewazar <orders@yourdomain.com>`.
   (Without a verified domain you can only send test emails to yourself.)
3. `ADMIN_NOTIFY_EMAIL` = where new-order alerts and contact messages go.
Without a key the store still works. Emails are skipped, and new accounts do not need email confirmation.

## 8. Shared rate limiting with Upstash (optional)
Only needed if you run more than one server instance. Create a free Redis database at https://upstash.com and set
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## 9. Run it
```bash
npm run dev          # http://localhost:3000
npm run build        # production build (run this before deploying)
npm start            # run the production build
```

## 10. First-time store setup (in the browser)
1. Open `/login` and sign in with your admin Google account.
2. Open `/admin/products` and click **Import starter catalog**.
3. Open `/admin/settings`: enter your real WhatsApp number, phone, email, payment account numbers, delivery charge, coupons and couriers. Save.
   Then open `/admin/content` to set your shop name, logo, home page text and policy pages, and `/admin/categories` to adjust the categories.
4. Replace starter products with real ones: upload photos, set prices and stock.

## 11. Deploy on Vercel
1. Push the project to a **private** GitHub repository (never commit `.env.local`).
2. https://vercel.com > Add New Project > import the repo.
3. Add every variable from `.env.local` in Project Settings > Environment Variables. Change:
   - `NEXTAUTH_URL=https://YOUR-DOMAIN`
   - `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN`
4. Deploy. Then add the live callback URLs in Google (and GitHub) as shown above.
5. Add your domain in Vercel > Domains and follow the DNS instructions.

## 12. Before you announce the store (checklist)
- [ ] Real WhatsApp, phone, email and address in Settings
- [ ] Real payment account numbers in Settings (check each one twice)
- [ ] Real product photos, prices and stock
- [ ] Place a test order for each payment method, then cancel it in the admin
- [ ] Resend domain verified and a test email received
- [ ] Privacy policy and terms reviewed
- [ ] Old test accounts and test orders removed in MongoDB Atlas if needed

## Troubleshooting
- **"Please define the MONGODB_URI"**: `.env.local` is missing or the dev server was not restarted after editing it.
- **Google says redirect_uri_mismatch**: the callback URL in Google must match exactly, including `http`/`https`.
- **Admin page says "Admin access only"**: the signed-in email must be listed in `ADMIN_EMAILS`, and you must sign in with Google/GitHub (not a password). Sign out and in again after changing it.
- **Emails are not arriving**: check `RESEND_API_KEY`, the verified domain and the spam folder.
- **Images from other websites do not show**: use the Upload button instead.
