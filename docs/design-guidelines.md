# Design guidelines: Storage Bin & Crate Rental Service

## Brand intent

The experience should feel **modern, clean, and trustworthy**, with a subtle **industrial** edge: sturdy typography, confident spacing, and color drawn from the product: **dark charcoal bins** and **yellow lid accents**: plus supporting neutrals. Optional **teal** appears sparingly (e.g., cleaning/accessory cues or secondary highlights) so the palette stays disciplined.

**Keywords:** durable, organized, on-time, professional, no-nonsense.

---

## Color system

| Token | Role | Suggested hex (tune for WCAG) |
|-------|------|-------------------------------|
| `--background` | Page background | `#F4F4F5` (cool gray) or white `#FFFFFF` |
| `--foreground` | Body text | `#18181B` (zinc-900) |
| `--muted` | Secondary text | `#52525B` (zinc-600) |
| `--primary` | Primary actions, key headlines accent | `#EAB308` to `#CA8A04` (yellow-500/600): test contrast on white/charcoal |
| `--primary-foreground` | Text on primary buttons | `#18181B` or `#0A0A0A` |
| `--accent` | Charcoal surfaces, footer, dark sections | `#27272A` to `#18181B` |
| `--accent-foreground` | Text on dark sections | `#FAFAFA` |
| `--destructive` | Errors | Tailwind red scale |
| `--ring` | Focus rings | Yellow or charcoal with 2px offset |

**Rules**

- Use **yellow** for CTAs, key stats, and highlights: not for long paragraphs of text.
- Use **charcoal** for nav bars, footers, or full-bleed “industrial” bands behind white cards.
- Maintain **4.5:1** contrast for body text; pair yellow with dark text or dark backgrounds, not small yellow text on white.

---

## Typography

- **Headings:** A strong grotesk or neo-grotesk (e.g., **Inter**, **DM Sans**, or **Plus Jakarta Sans**). Uppercase allowed sparingly for section labels (`tracking-wide`, small size).
- **Body:** Same family or a readable pairing; 16px minimum on mobile, comfortable line-height (1.5–1.6).
- **Numbers:** Tabular lining figures for prices and quantities where possible.

---

## Layout & components

- **Spacing:** Generous vertical rhythm (e.g., `py-16` / `py-24` sections); card-based layouts for products.
- **Corners:** Moderate radius (`rounded-lg` / `rounded-xl`): professional, not playful.
- **Elevation:** Subtle shadows on cards; avoid heavy skeuomorphism.
- **Imagery:** Full-width hero with **real bin photography**; grid of product shots with consistent lighting and angle.
- **Icons:** Simple line icons (Lucide via shadcn) for delivery, calendar, shield, stack.

---

## Hero section (using the bin image)

**Concept:** Full-bleed or large split hero. **Left (or overlay):** headline + subcopy + primary CTA **“Rent Bins Today”** and secondary **“View sizes & pricing”**. **Right / background:** High-quality photo of **stacked dark gray bins with yellow lids**, with optional props (teal cloth, yellow sponge, spray bottle in handle cutout) to signal “move-ready / job-ready.”

**Treatment ideas**

- Dark **gradient overlay** (`from-zinc-900/80 to-zinc-900/40`) over the image with **white or zinc-50** headline text and **yellow** CTA button.
- Or **split layout**: charcoal left column with copy; photographic right column: keeps text readable without heavy overlay.
- Add a slim **trust strip** under the hero: “Delivery & pickup · Stackable & durable · Commercial-grade plastic.”

**Accessibility:** Provide `alt` text describing bins and context; ensure CTA contrast meets WCAG if placed on photo.

---

## Photography direction

- Stack bins **3–4 high** to show stability; show **lid color** clearly.
- Include **one lifestyle shot** (driveway, garage, moving truck context) and **one clean studio-style** shot for the catalog.
- **Accessories** (cloths, sponges, cleaning bottle) as secondary props: not cluttering the hero.

---

## Motion

- Prefer **CSS-only** subtle fades on scroll; avoid distracting parallax.
- Button hover: slight brightness or scale (`scale-[1.02]`), 150–200ms.

---

## Voice & tone

- **Direct:** “We deliver. You pack. We pick up.”
- **Reassuring:** Clear policies, no hidden fees in headings (details in body/FAQ).
- **Professional:** Avoid gimmicky slang; contractors and businesses should feel at home.

---

## shadcn / Tailwind mapping

- Map `--primary` to yellow accent; `--secondary` to zinc; use `Card`, `Button`, `Accordion` (FAQ), `Sheet` or `Dialog` for mobile nav.
- Dark footer: `bg-zinc-900 text-zinc-50` with yellow link hover.

---

## Competitive differentiation (visual)

- Avoid “generic startup purple.” Own **charcoal + yellow** consistently.
- Show **real hardware** in hero and product pages: conversion rises when customers see the actual bins they will receive.
