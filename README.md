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

Open [http://localhost:3000](http://localhost:3000). Marketing routes: `/`, `/products`, `/how-it-works`, `/pricing`, `/about`, `/contact`. The contact form posts to `POST /api/quote`; without `DATABASE_URL`, requests are logged to the server console only.

## Deploy on Vercel

The Next.js app is at the **repository root** (`package.json` next to `src/`), so you **do not** need to set **Root Directory** in Vercel. Connect the repo, use the default **Framework Preset: Next.js**, and deploy.

If an older Vercel project still had **Root Directory** set to `web`, remove it (clear the field or set to `.`) and redeploy.

Optional environment variables (Production / Preview):

- **`NEXT_PUBLIC_SITE_URL`**: your live URL, e.g. `https://your-project.vercel.app` (used for metadata).

## Documentation only

Open the files in **Documentation in this repo** in order: brief → requirements → design → user stories → page content.

## Database (optional)

Point `DATABASE_URL` at PostgreSQL, then from the repo root:

```bash
npx prisma migrate dev --name init
```

This creates `QuoteRequest` (and `Product`) tables from `prisma/schema.prisma`. Wire Stripe keys in `.env.local` when you add checkout (never commit secrets).

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
