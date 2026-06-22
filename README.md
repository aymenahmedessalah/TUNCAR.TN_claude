# TUNCAR — Smart Automotive Parts Platform

A marketplace for OEM-compatible new and used car parts in Tunisia.
Buyers find parts by selecting their exact vehicle (brand -> model ->
engine variant -> year), browse parts by vehicle subsystem, and check
out through a guided flow that activates a video-verified warranty on
delivery. Sellers publish vehicle/part data through a dedicated
dashboard.

## Tech stack

- **React 19** + **Vite** -- fast dev server and build
- **React Router** -- client-side routing (multi-page architecture)
- **lucide-react** -- icon set (no emoji, by design)
- Plain CSS with a shared design-token system (see `src/index.css`) --
  no UI framework, so the existing cyber/neon visual identity stays
  exactly as designed

## Project structure

```
src/
  components/         Shared, reusable UI pieces
    checkout/          Components used only inside the checkout flow
  context/            Global state (language, cart, selected vehicle)
  data/                Mock/seed data (vehicles, parts, addresses)
  i18n/                Translation dictionary (ar / fr / en)
  pages/               One file per route (Buyer, Seller, Checkout)
  utils/               Small framework-agnostic helpers (icon lookup)
  App.jsx              Route definitions
  main.jsx             App entry point + provider setup
```

Routes:

| Path        | Page                                                   |
|-------------|---------------------------------------------------------|
| `/`         | Buyer flow -- vehicle selection + parts catalog          |
| `/sell`     | Seller dashboard -- publish a vehicle/parts system        |
| `/checkout` | 5-step checkout: validation -> address -> payment -> unboxing report -> active warranty |

## Getting started

```bash
npm install
npm run dev      # starts the local dev server (prints a localhost URL)
```

Other useful commands:

```bash
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npm run lint      # check code quality
```

## Data layer (current state)

All vehicle and parts data currently lives in `src/data/*.js` as mock
seed data. These files are intentionally framework-agnostic (plain
JS objects/arrays) so that swapping them for real API calls later
does not require touching any component -- only the data files
themselves change.

## Roadmap (not yet implemented)

- Real backend / database (vehicles, parts, orders, users)
- Authentication for buyers and sellers
- Buyer dashboard with order history and shipment tracking
- Real OEM part-number matching instead of free-text specs
