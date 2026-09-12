# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A cash-register **toy for children**: a kid plays shopkeeper at a real barcode scanner and touchscreen, scanning products, ringing up a cart, swiping a loyalty card and "paying". Nothing is real — no money moves, no order is ever persisted, checkout just credits points and empties the cart.

That shapes the priorities: big touch targets, immediate visual feedback, no dead ends a child can get stuck in, and no step that requires reading fine print or typing. Supabase is used for exactly two things — the shared **product/customer database** (so the catalog can be edited from the admin screens and survive a reload) and the **realtime channel behind the simulated phone payment**. It is not an auth, ordering or payment backend; don't grow it into one without asking.

## Commands

```sh
npm run dev              # Remix dev server on http://localhost:3000 (host: true, reachable on LAN — needed for the phone-payment QR flow)
npm run build            # remix vite:build
npm start                # serve ./build/server/index.js
npm run typecheck        # tsc --noEmit
npm run lint             # eslint over the repo (cached)
npm run storybook        # Storybook on :6006
```

There is **no `test` script**. Tests are Storybook stories executed in a real browser by Vitest:

```sh
npx playwright install chromium     # one-time
npx vitest --project=storybook                       # all stories
npx vitest --project=storybook app/components/ui/Button.stories.tsx   # one file
npx vitest --project=storybook -t "Primary"          # one story by name
```

`vitest.workspace.ts` wires `@storybook/experimental-addon-test` to `.storybook/`; Storybook itself builds through `sb-vite.config.ts` (a Remix-plugin-free Vite config), not `vite.config.ts`.

## Environment

`SUPABASE_URL` and `SUPABASE_ANON_KEY` must be in `.env` (gitignored). Both Supabase clients throw at import time if they are missing, so a missing `.env` breaks the app at boot, not at first query.

## Architecture

Remix (Vite, flat file routes) + React 18 + Tailwind + Supabase. UI strings, comments and TODOs are in **Italian** (the players are Italian-speaking children); keep new user-facing text Italian and short.

Two play modes plus a back office: `/store` (scan barcodes against the catalog, loyalty card, checkout) and `/bar` (no scanner — a hard-coded menu of drinks and food at fixed prices in `bar.tsx`), with `/admin/*` for grown-ups: catalog and customer CRUD, barcode generation and scanner-config barcodes, plus kiosk exit/shutdown.

### Two Supabase clients — pick deliberately
- `~/lib/supabase.server` — server only, reads `process.env`. Use in loaders/actions that touch `customers` or write to `products`.
- `~/lib/supabase` — isomorphic. In the browser it reads `window.ENV`, which `app/root.tsx`'s loader injects via an inline `<script>`. Required for anything realtime (presence channels) since that runs client-side. `catalogLoader` also uses it.

### Global state
`app/hooks/applicationStore.tsx` holds one context object with slices `cart | catalog | messages | customers | customerCard`. `useApplicationStore(slice)` returns `[value, setSlice]`, React-`useState`-style. Feature hooks wrap it:
- `useCart(catalog)` — `catalog` is only needed to resolve a barcode in `addProduct`; calling `useCart([])` elsewhere (as `/bar`, `_index`, `admin._index`, `CartList` do) is intentional when you only need `total`/`emptyCart`/`removeProduct`.
- `useMessages` — queue rendered by the single `<PopupMessage/>` mounted in `App.tsx`; `addMessage({type, message})` is how errors surface to the cashier.
- `useCustomerCard` — posts to `/api/customers/fetch` via `useFetcher`, guards re-processing with a `lastProcessedData` ref.

### Menu-driven screens
Every screen (`_index`, `store`, `bar`, `admin._index`) is a `<Menu config={...}/>` (`app/components/ui/Menu.tsx`). A `MenuConfig` entry is one of:
- `action` — a callback,
- `children` — a submenu (Menu keeps an index path and renders its own "Indietro"),
- `component` — a `React.ComponentType<{onBack, onReset}>` rendered full-pane; the convention is `component: (props) => <X {...props} onClear={props.onBack} onEnter={...}/>`,
- `customElement` — a node rendered inline instead of a button (used to mount `<BarcodeReader/>`, which renders `null`).

Adding a screen usually means adding a `MenuConfig` entry, not a route.

### Button icons
`app/components/ui/Button.tsx` maps icon names to **Material Symbols Outlined codepoints** in `iconMap`. A new icon means adding its `\ueXXX` codepoint there — the font is loaded by `root.tsx` `links` and, for Storybook, by `.storybook/preview-head.html`.

### Barcode input
`BarcodeReader` is a keyboard-wedge listener: a `window` `keypress` handler buffers chars, flushes on Enter or after 100ms of silence, and clears the buffer if >100ms elapsed between keys. It renders nothing, so mount it wherever scanning should be live. Customer cards use numeric input padded to `CRS-CUSTOMER-NNN` (see `store.tsx#onCustomerCard`).

### Phone ("Cellulare") payment — simulated
Make-believe: the "phone" just announces `hasPaid` over a channel; no provider, no charge, no verification, and that is the point. Peer-to-peer over a Supabase Realtime **presence** channel named `payment/<channelId>/presence` (`app/components/cashlessPayment/usePaymentPresence.ts`). Register side (`ReceivePayment`) tracks `{role:'receiver', amount}` and shows a QR to `/payment/<channelId>`; the phone (`SendPayment`, route `payment.$id.tsx`) tracks `{role:'sender', hasPaid}`. `ReceiveMessagesWrapper` mints the channel id per mount. Append `?debug=true` to render `DebugPresence`. `testrequestpayment.$id.tsx` is a manual harness with a hard-coded amount.

### Data model (Supabase)
`products (id, barcode, name, price)` and `customers (id, name, card_number, points)`. Catalog CRUD lives in `admin.catalog.tsx`'s own `action` (a `actionType` switch over add/update/delete); customer reads/writes go through `app/actions/customerActions.ts` behind the `api.customers.*` resource routes. Loyalty points earned = `Math.floor(total)`, applied at checkout.

## Conventions

- Absolute imports via the `~/*` → `app/*` alias; `import/internal-regex` is `^~/`.
- Functional components with hooks, TypeScript, explicit prop interfaces, descriptive handler names (`onDigitPress`, not `onDigit`), components capitalized. Airbnb style is the stated baseline.
- Stories live in **two** places: `stories/` and `app/components/ui/**/*.stories.tsx`. Presentational UI in `app/components/ui/` should get a story; store-connected wrappers (e.g. `PopupMessage` vs `PurePopupMessage`) stay untested — extract a pure component when a story is wanted.
- Money is computed through `compute()` in `app/utils/utils.ts` (integer-scaled multiply) and formatted with `formatNumber`; don't reintroduce raw float multiplication.

## Gotchas

- `.github/copilot-instructions.md` mentions Jest + React Testing Library and Prettier — neither is installed. The real setup is Storybook + Vitest browser mode, and there is no Prettier config.
- `ReceiveMessagesWrapper.tsx` imports `uuid`, which is not a declared dependency (only a transitive lockfile entry). Add it to `package.json` if that import ever fails to resolve.
- `app/data.ts` is leftover Remix-tutorial fake-contacts code, imported by nothing. Don't extend it.
- `TODO.md` and `todo.txt` are the product backlog (Italian) and the best source of intended-but-missing features.
