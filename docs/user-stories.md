# User stories: Storage Bin & Crate Rental Service

Format: **As a [role], I want [capability], so that [benefit].** Acceptance criteria are indicative; refine during implementation.

---

## Customer (prospect / renter)

### Discovery & trust

1. **As a** homeowner planning a move, **I want** to see clear photos and descriptions of bin sizes and accessories, **so that** I can choose the right quantity and avoid last-minute shortages.

   - **Acceptance:** Products page shows at least three bin/crate tiers with dimensions, weight capacity, and stack notes; accessory add-ons are listed or linked.

2. **As a** mobile user, **I want** to read pricing and tap “Rent” without horizontal scrolling, **so that** I can start a booking on my phone.

   - **Acceptance:** Key pages pass basic mobile layout checks; primary CTA visible above the fold on home.

3. **As a** skeptical visitor, **I want** to understand delivery, pickup, and what happens if I need more time, **so that** I feel confident before paying.

   - **Acceptance:** How it works + FAQ cover rental period, extensions, and pickup scheduling.

### Booking & payment

4. **As a** customer, **I want** to select bins, dates, and delivery/pickup preferences, **so that** I get an accurate total before checkout.

   - **Acceptance:** Flow validates dates (e.g., min lead time), shows line items, taxes/fees as applicable, and deposit policy.

5. **As a** customer, **I want** to pay securely with a card, **so that** my order is confirmed without sharing card data with custom forms.

   - **Acceptance:** Redirect or embedded Checkout from PSP; success page and email confirmation.

6. **As a** returning customer, **I want** to log in and see my past and upcoming orders, **so that** I can track delivery without calling support.

   - **Acceptance:** Dashboard lists orders with status; links to receipts where enabled.

### Support

7. **As a** customer with a large job, **I want** to request a quote via a form, **so that** a coordinator can propose volume pricing and scheduling.

   - **Acceptance:** Form captures contact, location, dates, quantities; confirmation message; notification to ops (email or admin).

---

## Admin / operations

### Catalog & inventory

8. **As an** admin, **I want** to create and edit product SKUs (bins, crates, accessories), **so that** the website reflects current offerings.

   - **Acceptance:** CRUD with name, price, deposit, attributes; inactive SKUs hidden from booking.

9. **As an** admin, **I want** to set or adjust availability (by date or global count), **so that** we do not overbook during peak season.

   - **Acceptance:** Changing availability affects what customers can select (or shows waitlist message).

### Orders & payments

10. **As an** admin, **I want** to view new orders with payment status, **so that** I can schedule delivery.

    - **Acceptance:** Order list filterable by status/date; detail shows line items and customer address.

11. **As an** admin, **I want** payment webhooks to update order state automatically, **so that** manual reconciliation is minimized.

    - **Acceptance:** Paid orders move to “confirmed”; failures recorded with reason.

### Fulfillment

12. **As a** dispatcher, **I want** to mark an order as delivered or picked up, **so that** customer-facing status stays accurate.

    - **Acceptance:** Status updates visible in customer account (if enabled) or at least in admin export.

---

## System / integration

13. **As the** system, **I want** to send transactional emails for order confirmation and key status changes, **so that** customers have a paper trail.

    - **Acceptance:** Templates branded; unsubscribe not required for transactional (marketing separate).

14. **As a** developer, **I want** migrations and seed data for local development, **so that** the team can reproduce booking flows reliably.

    - **Acceptance:** README documents `prisma migrate` / seed; sample products load in dev.

---

## Out of scope (initial backlog placeholders)

- Native apps
- Multi-language (i18n): add stories when prioritized
- Partner API for third-party marketplaces
