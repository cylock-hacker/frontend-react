# Umutima Bank — Customer Dashboard (Frontend Simulation)

> **FRONTEND SIMULATION** — This application does not connect to a real bank or process real financial transactions.

A React.js banking customer dashboard with a **glassmorphism** interface. Built for module ITLDF601 – Frontend Development.

## Technologies
React 18, Vite, JavaScript ES6+, React Router 6, Material UI (MUI 5), Recharts, HTML5/CSS3, browser localStorage.

## Install & run
```bash
npm install
npm run dev      # open the URL Vite prints (http://localhost:5173)
npm run build    # production build
```

## Main features
Simulated login · Dashboard (6 stat cards, 4 Recharts charts, recent transactions/transfers, notifications, cards, quick actions) · Accounts + `/accounts/:accountId` details · Transactions (search, filter by account/category/type/status/date, sort, pagination, detail dialog) · Transfers (validation, confirmation dialog, history) · Cards (view, freeze/unfreeze, linked account) · Profile (validated edit form) · Notifications (read/unread, mark all, delete, filter, MUI Badge) · loading, empty and error states · responsive drawer.

## Mock data
`src/data.js` seeds 1 customer, 4 accounts, 39 transactions, 13 transfers, 4 cards and 12 notifications on first run (all fake). Account balances are **computed** from opening balances + completed transactions. Data is then persisted in localStorage (key `umutima-bank-sim-v1`). Use **Reset demo data** on the entry screen to start over.

## Transfer simulation rules
1. All fields validated (recipient account = 8–16 digits, amount > 0).
2. Amount must not exceed the account's *available* balance (balance − holds).
3. A confirmation dialog appears before anything is saved.
4. On confirm: balance is deducted, a **Transfer Out** transaction and a transfer record (`TRX-2026-0001` style reference) are created, a notification is added, and everything is saved to localStorage.
5. Dashboard cards and charts update instantly because they are derived (`reduce`, `filter`, `map`, `sort`) from the same state (`src/utils.js → summarize`).

## Screenshots
Run the app and add screenshots of each page to a `/screenshots` folder.

## Future improvements
MUI DataGrid for transactions, light/dark theme toggle, PDF statements, scheduled transfers, unit tests.
