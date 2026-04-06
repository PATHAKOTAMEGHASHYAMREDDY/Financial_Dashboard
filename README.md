# Finance Dashboard

A professional, modern Finance Dashboard web application built with Angular, NG-ZORRO, Tailwind CSS, and Chart.js.

## Features

### Dashboard Overview
- **Summary Cards**: Display Total Balance, Total Income, Total Expenses, and Total Savings
- **Balance Trend Chart**: Line chart showing balance progression over time
- **Category Expenses Chart**: Doughnut chart displaying expense distribution by category
- **Insights Section**:
  - Highest spending category
  - Monthly comparison (current vs previous month)
  - Savings rate percentage

### Transactions Module
- **Transaction Table**: View all transactions with sorting and pagination
- **Advanced Filtering**:
  - Search by description or category
  - Filter by category and type (Income/Expense)
  - Date range filtering
  - Amount range filtering
- **CRUD Operations** (Admin only):
  - Add new transactions
  - Edit existing transactions
  - Delete transactions
- **Export Functionality**:
  - Export to CSV
  - Export to JSON

### Role-Based UI
- **Admin Role**: Full access to add, edit, and delete transactions
- **Viewer Role**: Read-only access to view data
- Role switcher in the header for easy testing

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference stored in localStorage
- Smooth transitions between themes

### Data Persistence
- All transactions stored in localStorage
- Data persists across browser sessions
- Mock data automatically initialized on first load

### Modern UI/UX
- Fully responsive design (mobile + desktop)
- Professional fintech-inspired layout
- Smooth animations and transitions
- Clean spacing and typography
- Empty state handling

## Tech Stack

- **Angular 18**: Latest version with standalone components
- **NG-ZORRO (Ant Design)**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **ng2-charts (Chart.js)**: Data visualization
- **RxJS**: Reactive state management
- **TypeScript**: Type-safe development

## Project Structure

```
finance-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/              # Dashboard module
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.scss
│   │   ├── transactions/           # Transactions module
│   │   │   ├── transactions.component.ts
│   │   │   ├── transactions.component.html
│   │   │   └── transactions.component.scss
│   │   ├── shared/                 # Shared components
│   │   │   └── summary-card/
│   │   │       └── summary-card.component.ts
│   │   ├── services/               # Services
│   │   │   ├── transaction.service.ts
│   │   │   ├── theme.service.ts
│   │   │   ├── role.service.ts
│   │   │   └── export.service.ts
│   │   ├── models/                 # TypeScript interfaces
│   │   │   └── transaction.model.ts
│   │   ├── app.component.ts        # Main app component
│   │   ├── app.routes.ts           # Routing configuration
│   │   └── app.config.ts           # App configuration
│   ├── styles.scss                 # Global styles
│   └── index.html
├── tailwind.config.js              # Tailwind configuration
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18 or higher)

### Installation

1. Navigate to the project directory:
```bash
cd finance-dashboard
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

## Usage

### Testing Different Roles
1. Use the role switcher in the header to toggle between Admin and Viewer
2. **Admin**: Can add, edit, and delete transactions
3. **Viewer**: Can only view data (action buttons hidden)

### Adding Transactions
1. Switch to Admin role
2. Navigate to Transactions page
3. Click "Add Transaction" button
4. Fill in the form and submit

### Filtering Transactions
1. Use the search box to find transactions by description or category
2. Select category or type from dropdowns
3. Choose a date range
4. Set amount range (min/max)
5. Click "Clear Filters" to reset

### Exporting Data
1. Navigate to Transactions page
2. Apply any filters (optional)
3. Click "Export" dropdown
4. Choose CSV or JSON format

### Dark Mode
1. Toggle the switch in the header
2. Theme preference is saved automatically

## Mock Data

The application comes with pre-populated mock data including:
- Sample income transactions (Salary, Freelance)
- Sample expense transactions (Rent, Groceries, Entertainment, Transport)
- Transactions spanning current and previous month for comparison

## Key Features Implementation

### State Management
- Services use RxJS BehaviorSubject for reactive state
- Components subscribe to observables for real-time updates
- LocalStorage integration for data persistence

### Mock API Simulation
- Services use RxJS `delay` operator to simulate network latency
- Provides realistic loading experience

### Animations
- Fade-in animations on page load
- Hover effects on cards and table rows
- Smooth transitions between themes
- Page transition animations

### Advanced Filtering
- Multiple filter criteria can be combined
- Real-time filtering as user types/selects
- Clear all filters with one click
- Filters work with pagination

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Standalone components for better tree-shaking
- OnPush change detection strategy where applicable
- Lazy loading ready architecture
- Optimized bundle size

## Future Enhancements

- Backend API integration
- User authentication
- Budget planning features
- Recurring transactions
- Multi-currency support
- Advanced analytics and reports
- Mobile app version

## License

MIT License

## Author

Built with ❤️ using Angular and NG-ZORRO
