# Requirements: Storage Bin & Crate Rental Service

## Functional requirements

### Public marketing & content

| ID | Requirement | Priority |
|----|-------------|----------|
| F-1 | **Home page** with hero, benefits, how it works, featured products, primary CTA (“Rent Bins Today” or equivalent) | Must |
| F-2 | **Products / inventory** page listing bin/crate types with dimensions, capacity, stackability, lid type, and indicative pricing | Must |
| F-3 | **How it works** page describing delivery → use → pickup, including rental period rules | Must |
| F-4 | **Pricing & packages** page with transparent tiers or per-bin pricing, delivery fees, and deposit policy | Must |
| F-5 | **About us** page: mission, service area, sustainability/reuse angle | Should |
| F-6 | **Contact / get a quote** with form (name, email, phone, address/zip, dates, quantity, message) and business contact details | Must |
| F-7 | **FAQ** (expandable) covering rental length, damaged/lost bins, weather, cancellation | Should |
| F-8 | **Legal**: privacy policy, terms of service, cookie notice if analytics/marketing cookies used | Must (before tracking) |

### Booking & commerce

| ID | Requirement | Priority |
|----|-------------|----------|
| F-10 | **Online booking flow**: select products, quantities, rental dates, delivery/pickup windows (or request-based if inventory is manual at first) | Must (phase: MVP may be “request quote” only) |
| F-11 | **Inventory view** showing bin types and **availability signal** (in stock / low / waitlist) with rules TBD by ops | Should |
| F-12 | **Pricing calculator** or cart subtotal including rental, delivery, taxes, deposits | Must |
| F-13 | **Secure checkout** via payment provider (e.g., Stripe Checkout) | Must |
| F-14 | **Order confirmation** email (and SMS optional) with summary and next steps | Must |
| F-15 | **Customer dashboard / account**: order history, upcoming delivery/pickup, receipts | Should |
| F-16 | **Admin panel** (or protected routes): orders, customer records, inventory counts, mark deliveries complete | Must |

### Operations (admin)

| ID | Requirement | Priority |
|----|-------------|----------|
| F-20 | Create/edit **inventory SKUs** (name, SKU, attributes, active flag) | Must |
| F-21 | Adjust **stock levels** or availability by date range (manual v1 acceptable) | Must |
| F-22 | **Export** orders (CSV) for routing/dispatch | Could |
| F-23 | **Webhook handling** for payment events (paid, failed, refunded) | Must |

### Accessories & upsells

| ID | Requirement | Priority |
|----|-------------|----------|
| F-30 | List **accessories** (pads, locks, cleaning supplies) as add-ons in booking or catalog | Should |

---

## Non-functional requirements

### Experience & performance

| ID | Requirement | Target / note |
|----|-------------|----------------|
| N-1 | **Mobile-first** responsive layout; touch-friendly CTAs and forms | 320px+ widths usable |
| N-2 | **Fast loading**: optimized images (WebP/AVIF), lazy loading below fold, minimal JS on marketing pages | Core Web Vitals in “good” range on key URLs |
| N-3 | **Accessibility**: WCAG 2.1 Level AA goal for primary flows (contrast, focus, form labels) | Align with shadcn/Radix defaults + audit |
| N-4 | **SEO**: unique titles/meta per page, structured data for `LocalBusiness` or `Organization` where applicable, clean URLs | Sitemap + `robots.txt` |

### Security & compliance

| ID | Requirement | Target / note |
|----|-------------|----------------|
| N-10 | **HTTPS** everywhere | Enforced in production |
| N-11 | **Secure payments**: no raw card data on our servers; use PSP-hosted fields or Checkout | Stripe (or equivalent) |
| N-12 | **Secrets** in environment variables; never in repo | `.env.local` gitignored |
| N-13 | **PII** minimized; retention policy documented | Privacy policy |
| N-14 | **Rate limiting** on public APIs and form endpoints | Reduce spam/abuse |

### Reliability & maintainability

| ID | Requirement | Target / note |
|----|-------------|----------------|
| N-20 | **Typed codebase** (TypeScript) for app and shared types | Required |
| N-21 | **Database migrations** versioned (e.g., Prisma) | Required |
| N-22 | **Error monitoring** (e.g., Sentry) in production | Should |
| N-23 | **Backups** for PostgreSQL | Per host/provider defaults + verify restore | Should |

---

## Assumptions & dependencies

- Service area and delivery pricing are defined by the business and configurable (CMS, DB, or env).
- “Real-time availability” may start as **daily batch updates** or **manual admin flags** before live inventory sync.
- Stripe (or chosen PSP) account in good standing; webhooks reachable in production.

---

## Traceability

Detailed acceptance-style stories live in [`user-stories.md`](./user-stories.md). Design direction is in [`design-guidelines.md`](./design-guidelines.md).
