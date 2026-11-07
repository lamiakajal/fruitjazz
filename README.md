<div align="center">

<img src="docs/banner.png" alt="Mewazar: online store for raw honey, nuts and dry fruits" width="100%" />

# Mewazar

**A complete, full-stack online store for raw honey, nuts, dry fruits, dates, spices, tea, ghee and gift boxes, with an admin panel the shop owner runs without writing code.**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![NextAuth](https://img.shields.io/badge/Auth-NextAuth-7C3AED)
![License](https://img.shields.io/badge/license-proprietary-lightgrey)

</div>

## Overview
Mewazar is built for a Pakistani food business: customers browse by category, pick pack sizes (250g / 500g / 1kg),
pay by Cash on Delivery, bank transfer or wallet, and track their parcel. The owner manages products, stock, orders,
coupons, reviews, couriers, categories, page text and even the shop name and logo from a built-in admin panel.

The storefront is fast (server components with a one-minute cache), SEO-ready, responsive from phones to desktops
and has a light and a dark theme.

## Features

### Storefront
- 11 starter categories and 50 starter products; owners can add their own categories
- Product pages with gallery, pack sizes, sale prices, stock warnings and customer reviews
- Cart drawer with free-delivery progress, wishlist, live search suggestions, filters and sorting
- Checkout with Cash on Delivery, bank transfer and wallets, coupons and reward coins
- Public order tracking (order number + phone) and "My orders" with courier tracking links
- First-visit loading screen, marquee, scroll progress bar, page transitions and honeycomb animations
- Light and dark mode, reduced-motion support, accessible navigation
- SEO: sitemap, robots, Open Graph, schema.org product data; 404 and error pages

### Admin panel (`/admin`)
| Area | What the owner can do |
| --- | --- |
| Dashboard | Orders today, payments to verify, revenue, low stock, reviews and messages waiting |
| Products | Add, edit, hide, delete; pack sizes, prices, sale price, stock; upload photos or paste links |
| Orders | Move through stages, verify or refund payments, courier and tracking ID, notes, invoice, WhatsApp message |
| Categories | Add, rename, recolour, reorder |
| Customers | View accounts and reward coins; add or remove coins |
| Reviews | Approve, unpublish, delete |
| Messages | Contact form inbox |
| Content | Shop name, logo, home page text, FAQ, About page and policies |
| Settings | Contact, delivery, pause orders, announcement, payments, coupons, couriers and tracking links, reward rules |

### Customer accounts
Google, GitHub or email sign-in, email confirmation, password reset, order history and reward coins.

## Tech stack
| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, server components, route handlers), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with design tokens, light and dark themes |
| Database | MongoDB Atlas with Mongoose |
| Auth | NextAuth (Google, GitHub, credentials), bcrypt |
| Email | Resend HTTP API (no extra package) |
| Rate limiting | In-memory, or Upstash Redis when configured |
| Hosting | Vercel (any Node 20+ host works) |

## Architecture
```mermaid
flowchart LR
  B[Browser<br/>storefront + admin] --> S[Next.js server<br/>components + /api]
  S --> D[(MongoDB)]
  S --> M[Resend email]
  S -.-> R[(Upstash Redis)]
```
More detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
