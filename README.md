# Bear Box Rentals

GitHub: [github.com/auhdz/top-bins](https://github.com/auhdz/top-bins) (repository slug `top-bins`; rename the repo in GitHub settings anytime).

**Bear Box Rentals** is the brand for a storage bin and box rental business: heavy-duty plastic bins and containers for moving, storage, job sites, events, and equipment protection. This repository includes product documentation, design guidelines, and a **Next.js app at the repository root**. The header/footer use the Bear Box Rentals wordmark in `public/brand/`.

## Recommended tech stack

| Layer | Choice | Rationale |
|--------|--------|------------|
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router) | Server components, SEO-friendly routes, API routes |
| **Language** | TypeScript | Safer refactors and clearer contracts across UI, API, and data |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Rapid UI, accessible primitives, easy theming to match brand (charcoal + yellow) |
| **Database** | PostgreSQL + [Prisma](https://www.prisma.io/) | Relational model fits inventory, bookings, users; migrations and type-safe queries |
| **Payments** | [Stripe](https://stripe.com/) (Checkout + Customer Portal) | PCI scope reduction, subscriptions/deposits if needed later |
| **Auth** | NextAuth.js / Auth.js or Clerk (optional for v1) | Customer accounts and admin separation |
| **Hosting** | Vercel, Railway, or similar | Fits Next.js; pair DB on managed Postgres |

**Admin:** A simple internal dashboard (protected route or separate deploy) for orders, inventory counts, and delivery windows: can start as server actions + Prisma before adding a full CMS.

## Documentation in this repo

- [`PROJECT-BRIEF.md`](./PROJECT-BRIEF.md): Business context, audience, goals
- [`docs/requirements.md`](./docs/requirements.md): Functional and non-functional requirements
- [`docs/user-stories.md`](./docs/user-stories.md): Customers and admins
- [`docs/design-guidelines.md`](./docs/design-guidelines.md): Visual direction (industrial, charcoal + yellow)
- [`content/pages/`](./content/pages/): Page/section copy and structure (Markdown; migrate into React/MDX later)

## Run the website (local)

From the repository root:

```bash
npm install
cp .env.example .env.local
# Optional: set DATABASE_URL, then:
# npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Marketing routes include `/`, `/products`, `/faq`, `/how-it-works`, `/pricing`, `/about`, `/contact`, `/legal/privacy`, `/legal/terms`. The contact form posts to `POST /api/quote`; without `DATABASE_URL`, requests are logged to the server console only. **`/sitemap.xml`** and **`/robots.txt`** are generated for SEO.

## Deploy on Vercel

The Next.js app is at the **repository root** (`package.json` next to `src/`), so you **do not** need to set **Root Directory** in Vercel. Connect the repo, use the default **Framework Preset: Next.js**, and deploy.

If an older Vercel project still had **Root Directory** set to `web`, remove it (clear the field or set to `.`) and redeploy.

Environment variables (Production / Preview) — copy `.env.example` to `.env.local`:

- **`NEXT_PUBLIC_SITE_URL`**: public site origin (not `EXT_PUBLIC_*`). Used for metadata and Stripe Checkout `success_url` / `cancel_url`. In Vercel, set this to `https://your-deployment.vercel.app` or your custom domain.
- **`STRIPE_SECRET_KEY`**, **`STRIPE_WEBHOOK_SECRET`**: from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) and **Developers → Webhooks** (endpoint URL: `https://<your-domain>/api/webhooks/stripe`). For local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and paste the CLI signing secret.
- **`DATABASE_URL`**: PostgreSQL — needed to store subscriptions and webhook idempotency.
- **`RESEND_API_KEY`**, **`EMAIL_FROM`**: optional; sends customer + internal emails when a subscription starts. See [Resend](https://resend.com).

**Rate limits (N-14):** `POST /api/create-checkout-session` — **20 req/min per IP**; `POST /api/quote` — **15 req/min per IP** (in-memory per instance; use Redis/Upstash if you scale to many instances).

**HTTPS:** Enforced automatically on Vercel and most managed hosts; no app code required.

**Error monitoring (N-22):** Optional tools such as [Sentry](https://sentry.io) are not bundled here. Add later if you want production stack traces and release tracking.

**Database backups (N-23):** Enable automated backups in your Postgres provider (Neon, Supabase, RDS, etc.) and periodically verify you can restore; not something this Next.js app configures.

## Documentation only

Open the files in **Documentation in this repo** in order: brief → requirements → design → user stories → page content.

## Database (optional)

Point `DATABASE_URL` at PostgreSQL, then from the repo root:

```bash
npx prisma migrate dev
```

This applies `prisma/migrations` (including `QuoteRequest`, `Product`, `StripeWebhookEvent`, `RentalSubscription`). In production run:

```bash
npm run db:migrate:deploy
```

That script loads **`DATABASE_URL` from `.env` and/or `.env.local`** (Prisma’s CLI alone only auto-loads `.env`, which is why `npx prisma migrate deploy` can appear to do nothing if your URL is only in `.env.local`). Wire secrets in those files only (never commit).

## Frontend folder structure

```
├── src/
│   ├── app/                 # App Router: layout, pages, route handlers
│   ├── components/
│   │   ├── ui/              # shadcn primitives
│   │   └── marketing/       # Hero, sections, CTAs
│   └── lib/                 # db, utils, site config
├── prisma/
├── public/
├── package.json
└── next.config.ts
```

## License

Proprietary: adjust for your organization.
