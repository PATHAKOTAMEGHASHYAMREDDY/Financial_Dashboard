# FinDash — Finance Dashboard

> A professional, modern personal finance dashboard built with **Angular 18**, **NG-ZORRO (Ant Design)**, and **Chart.js**. Track income, expenses, and spending patterns with a clean, responsive UI, dark mode, and role-based access control.

---

## Live Demo

**GitHub Repository:** [https://github.com/PATHAKOTAMEGHASHYAMREDDY/Financial_Dashboard](https://github.com/PATHAKOTAMEGHASHYAMREDDY/Financial_Dashboard)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Design Approach](#design-approach)
- [State Management](#state-management)
- [Role-Based UI](#role-based-ui)

---

## Overview

FinDash is a frontend-only finance dashboard built for evaluating UI development skills. It simulates a real-world financial tracking interface with:

- **Mock data** for transactions across 4 months (Jan–Apr 2026), with April data only up to today
- **RxJS BehaviorSubject** for reactive state management
- **localStorage** for full data persistence across sessions
- **Client-side filtering, sorting, and search** on all transaction data
- **CSV / JSON export** functionality
- **Lottie animations** for an engaging user experience

---

## Features

### 1. Dashboard Overview
- **4 Summary Cards** — Total Balance, Total Income, Total Expenses, Net Savings (all in ₹)
- **Balance Trend** — Line chart showing cumulative balance over time
- **Expenses by Category** — Doughnut chart with color-coded spending categories
- **Monthly Income vs Expenses** — Grouped bar chart comparing the last 4 months
- **Spending by Category** — Radar/spider chart showing top 6 spending categories
- **Insights Section** — Highest spending category, this month's expenses vs last month, savings rate %
- **Lottie Animation** — Isometric data analysis animation in the page header

### 2. Transactions Section
- **Table view** with Date, Description, Category, Type (Income/Expense), Amount
- **Sorting** on all major columns (Date, Category, Type, Amount)
- **Pagination** — configurable page size (10, 20, 50, 100)
- **Search** — real-time search by description or category
- **Filters** — filter by category, type (income/expense), date range, and amount range
- **Active filter indicator** — shows how many results match vs total
- **Lottie empty state** — displayed when no transactions match the filter
- **Export** — download current filtered data as CSV or JSON

### 3. Role-Based UI (RBAC Simulation)
| Feature | Admin | Viewer |
|---------|:-----:|:------:|
| View all data | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Edit Transaction | ✅ | ❌ |
| Delete Transaction | ✅ | ❌ |
| Export Data | ✅ | ✅ |

- Switch roles instantly using the **pill badge** in the header or the **sidebar menu item**
- No backend needed — role state is managed purely on the frontend via `RoleService`

### 4. Add / Edit Transaction Modal
- **Material Icons** on every form field label for visual clarity
- **Income / Expense type selector** — color-coded toggle buttons (green for income, red for expense)
- **Form validation** — Save button disabled until all required fields are filled
- **Date picker**, amount input with ₹ prefix, category dropdown, textarea description
- Full **dark mode support** in the modal

### 5. Dark Mode
- Toggle between light and dark themes using the **moon/sun icon** in the header
- Theme preference **persisted in localStorage** — survives page refresh
- Complete dark mode coverage: sidebar, header, charts, tables, modals, inputs, selects, date pickers, toasts

### 6. Data Persistence
- All transactions saved to **localStorage** on every add/edit/delete
- Mock data **auto-initializes** on first load (version-controlled, resets when data schema changes)
- Transactions survive browser refresh, tab close, and restart

### 7. Optional Enhancements Implemented
- ✅ Dark mode
- ✅ Data persistence (localStorage)
- ✅ Mock API simulation (RxJS `delay()` operator simulates network latency)
- ✅ Animations (Lottie, CSS keyframes, hover micro-animations)
- ✅ Export functionality (CSV + JSON)
- ✅ Advanced filtering (search + category + type + date range + amount range)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 18 (Standalone Components) |
| UI Library | NG-ZORRO (Ant Design for Angular) |
| Charts | ng2-charts (Chart.js wrapper) |
| Animations | ngx-lottie + lottie-web |
| State Management | RxJS BehaviorSubject |
| Styling | SCSS + Vanilla CSS custom properties |
| Icons | NG-ZORRO icons + Google Material Icons |
| Typography | Google Fonts — Inter |
| Persistence | Browser localStorage |
| Language | TypeScript |
| Build Tool | Angular CLI |

---

## Project Structure

```
finance-dashboard/
├── public/
│   ├── FaviconImg.png                  # Custom favicon
│   └── Isometric data analysis.json   # Lottie animation file
├── src/
│   ├── app/
│   │   ├── dashboard/                  # Dashboard page
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.scss
│   │   ├── transactions/              # Transactions page
│   │   │   ├── transactions.component.ts
│   │   │   ├── transactions.component.html
│   │   │   └── transactions.component.scss
│   │   ├── shared/
│   │   │   └── summary-card/          # Reusable stat card component
│   │   │       └── summary-card.component.ts
│   │   ├── services/
│   │   │   ├── transaction.service.ts  # Data + BehaviorSubject state
│   │   │   ├── theme.service.ts        # Dark/light mode toggle
│   │   │   ├── role.service.ts         # RBAC role management
│   │   │   └── export.service.ts       # CSV/JSON export logic
│   │   ├── models/
│   │   │   └── transaction.model.ts    # TypeScript interfaces
│   │   ├── app.component.ts            # Root layout (sidebar + header)
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts               # App providers (Lottie, Charts, etc.)
│   │   └── app.routes.ts               # Routing
│   ├── styles.scss                     # Global design tokens + NG-ZORRO dark mode overrides
│   └── index.html                      # Custom favicon + Google Fonts
├── package.json
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (bundled with Node.js)
- **Angular CLI** v18 — install globally:

```bash
npm install -g @angular/cli
```

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/PATHAKOTAMEGHASHYAMREDDY/Financial_Dashboard.git
cd Financial_Dashboard/finance-dashboard
```

**2. Install dependencies:**
```bash
npm install --legacy-peer-deps
```

> Use `--legacy-peer-deps` to resolve peer dependency version conflicts between Angular 18 and some UI libraries.

**3. Start the development server:**
```bash
ng serve
```

**4. Open in browser:**
```
http://localhost:4200
```

The app auto-reloads on any file change.

---

## Usage Guide

### Switching Roles
- Click the **Admin / Viewer pill** in the top-right header to toggle between roles
- Alternatively, click **"Admin Mode" / "Viewer Mode"** in the left sidebar
- As **Admin**: you can add, edit, and delete transactions
- As **Viewer**: the Add button and Edit/Delete actions are hidden

### Filtering Transactions
1. Use the **search box** — searches description AND category in real time
2. Select a **category** from the dropdown (Salary, Rent, Groceries, etc.)
3. Select a **type** — Income or Expense
4. Pick a **date range** using the date picker
5. Set an **amount range** (min ₹ to max ₹)
6. Multiple filters can be combined simultaneously
7. Click **Clear** to reset all filters

### Adding a Transaction (Admin Only)
1. Switch to **Admin** role
2. Go to **Transactions** page
3. Click the green **"+ Add Transaction"** button (top right)
4. Fill in:
   - Transaction type (Income / Expense)
   - Amount (₹)
   - Category
   - Date
   - Description
5. The **Add Transaction** button activates only when all fields are valid

### Exporting Data
1. Go to **Transactions** page
2. Apply any filters (optional — exports current filtered view)
3. Click the **Export** dropdown
4. Choose **CSV** or **JSON**

### Dark Mode
- Click the **moon/sun icon** in the top-right header
- Theme is automatically saved and restored on next visit

---

## Design Approach

### Visual Theme
- **Primary Color:** Emerald Green (`#059669`) — conveys financial health and growth
- **Dark Background:** Slate (`#0f172a`, `#1e293b`) — professional fintech aesthetic
- **Typography:** Inter (Google Fonts) — clean, modern, highly legible

### Component Architecture
- All components are **Angular Standalone** — no NgModules required
- The `SummaryCardComponent` is a fully reusable, configurable card with color, icon, and value props
- Charts are powered by `ng2-charts` wrapping Chart.js — each chart has its own `data` + `options` getter that automatically adapts colors for dark/light mode

### Dark Mode Strategy
NG-ZORRO's component styles are compiled into a minified bundle that cannot be overridden by simple class selectors. The solution used is:
- **Component-scoped:** `:host-context(.dark) ::ng-deep .ant-*` for components (tables, cards)
- **Global portal overrides:** `html.dark ::ng-deep .ant-modal-*` for elements rendered in CDK overlay portals (modals, dropdowns, pickers) — these *must* be in `styles.scss` since they render outside the Angular component tree

---

## State Management

| State | Service | Mechanism |
|-------|---------|-----------|
| Transactions list | `TransactionService` | `BehaviorSubject<Transaction[]>` |
| Selected role | `RoleService` | `BehaviorSubject<string>` |
| Dark/light theme | `ThemeService` | `BehaviorSubject<boolean>` + localStorage |
| Filters (search, category, type, dates, amounts) | `TransactionsComponent` | Local component state |

All components **subscribe** to observables and react automatically to state changes. Filters are **pure computed state** — they re-derive `filteredTransactions` from the master list without mutating it.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Edge | ✅ Latest |
| Safari | ✅ Latest |
| Mobile Chrome | ✅ |
| Mobile Safari | ✅ |

---

## Author

**Pathakota Megha Shyam Reddy**  
Built with ❤️ using Angular 18 & NG-ZORRO
