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
# Edit .env.local: set DATABASE_URL, STRIPE_* , NEXT_PUBLIC_SITE_URL as needed.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Marketing routes include `/`, `/products`, `/faq`, `/how-it-works`, `/pricing`, `/about`, `/contact`, `/legal/privacy`, `/legal/terms`. The contact form posts to `POST /api/quote`. **`/sitemap.xml`** and **`/robots.txt`** are generated for SEO.

## Deploy on Vercel

The Next.js app lives at the **repository root** (`package.json` next to `src/`). Connect the repo with **Framework Preset: Next.js**; leave **Root Directory** empty (or `.`). HTTPS is automatic on Vercel.

## Stripe integration (required, do in order)

Complete these before taking real payments.

1. **PostgreSQL** — Create a database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), RDS). You need a single **`DATABASE_URL`** connection string.

2. **Environment variables** — Add these four to **Vercel → Project → Settings → Environment Variables** for **Production** (and Preview if you use it). Names must match exactly; values come from your DB host and [Stripe Dashboard](https://dashboard.stripe.com):

   | Name | Value source |
   |------|----------------|
   | `DATABASE_URL` | Postgres provider |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` or your custom domain (no trailing slash) |
   | `STRIPE_SECRET_KEY` | Developers → API keys (`sk_test_…` or `sk_live_…`, same mode as your Dashboard) |
   | `STRIPE_WEBHOOK_SECRET` | Created in step 4 (`whsec_…`) |

   Redeploy after saving variables.

3. **Run migrations** on the production database (from your machine, with `DATABASE_URL` pointing at production, or via Vercel CLI / CI):

   ```bash
   npm run db:migrate:deploy
   ```

   This script loads **`.env` and `.env.local`** so `DATABASE_URL` is picked up even if you only use `.env.local` locally.

4. **Stripe webhook** — In Stripe → **Developers → Webhooks → Add endpoint**:

   - **Endpoint URL:** `https://<your-domain>/api/webhooks/stripe`
   - **Events:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the endpoint **Signing secret** into Vercel as `STRIPE_WEBHOOK_SECRET` and redeploy.

   **Local testing:** `stripe listen --forward-to localhost:3000/api/webhooks/stripe` — use the CLI **signing secret** as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

5. **Verify config** — Open `https://<your-domain>/api/health`. You should see `"ok": true` and all four checks `true`. If any are `false`, fix the matching env var in Vercel and redeploy.

6. **Test checkout** — Use Stripe **test mode** first: visit `/rental`, complete Checkout with [test card](https://stripe.com/docs/testing) `4242 4242 4242 4242`. Confirm the subscription appears in Stripe and (with `DATABASE_URL` set) rows in your database.

**API rate limits:** `POST /api/create-checkout-session` — 20 req/min per IP; `POST /api/quote` — 15 req/min per IP (per server instance).

## Documentation only

Open the files in **Documentation in this repo** in order: brief → requirements → design → user stories → page content.

## Database (local development)

For a local Postgres, you can use:

```bash
npx prisma migrate dev
```

Production deploys should use `npm run db:migrate:deploy` (see Stripe steps above).

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
