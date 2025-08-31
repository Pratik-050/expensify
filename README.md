# Expensify

A comprehensive Personal Finance Assistant built with Next.js, tRPC, and shadcn/ui components.

## Features Implemented

### Core Features

- **Dashboard with Financial Overview**
  - Stats cards showing total balance, monthly income/expenses, transaction count
  - Recent transactions list
  - Interactive charts showing income vs expenses
  - Quick action buttons

- **Transaction Management**
  - Complete transaction list with filtering and search
  - Filter by type (income/expense), category, date range
  - Add new transactions with a comprehensive form
  - Edit and delete existing transactions

- **Analytics & Visualizations**
  - Income vs Expenses bar chart
  - Expenses by category pie chart
  - Balance trend over time
  - Customizable date ranges

- **Receipt Upload**
  - Drag and drop file upload
  - Support for images (JPG, PNG) and PDF files
  - Simulated AI-powered data extraction
  - Progress tracking and error handling

- **Reports**
  - Monthly summary reports
  - Category breakdown analysis
  - Detailed transaction reports
  - Trend analysis
  - Export functionality (CSV/PDF)

### 🎨 UI/UX Features

- **Modern Design**
  - Clean, responsive layout using shadcn/ui components
  - Tangerine color theme
  - Dark/light mode support
  - Mobile-friendly design

- **Navigation**
  - Collapsible sidebar navigation
  - User profile dropdown
  - Breadcrumb navigation

- **Interactive Elements**
  - Loading states and skeleton screens
  - Toast notifications for user feedback
  - Modal dialogs for forms
  - Progress indicators

### 🔐 Authentication

- **Google OAuth Integration**
  - Secure sign-in with Google
  - Session management with JWT
  - User profile display
  - Automatic user creation/update

### 📱 Responsive Design

- Mobile-first approach
- Optimized for tablets and desktop
- Collapsible sidebar for mobile
- Responsive grid layouts

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS 4 with shadcn/ui components
- **Authentication:** NextAuth.js with Google OAuth
- **State Management:** tRPC for API calls
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **Notifications:** Sonner for toast messages

## Pages Structure

```
/                     - Dashboard with overview
/transactions         - Transaction list and management
/analytics           - Charts and data visualization
/receipt-upload      - File upload for receipt processing
/reports             - Financial reports and exports
```

## Components Architecture

```
src/components/
├── ui/                    # shadcn/ui base components
├── layout/
│   ├── app-sidebar.tsx   # Navigation sidebar
│   └── dashboard-layout.tsx # Main layout wrapper
├── dashboard/
│   ├── stats-card.tsx    # Statistics display cards
│   ├── recent-transactions.tsx # Transaction list widget
│   └── overview-chart.tsx # Dashboard charts
└── transactions/
    └── add-transaction-dialog.tsx # Transaction form modal
```

## Key Features Details

### Transaction Form

- Type selection (income/expense)
- Dynamic category selection based on type
- Amount input with validation
- Date picker with calendar
- Optional description field
- Form validation with error messages

### Filtering System

- Search across description and category
- Filter by transaction type
- Category-based filtering
- Date range selection with calendar
- Clear all filters functionality

### Charts & Analytics

- Interactive bar charts for income vs expenses
- Pie charts for category breakdown
- Area charts for balance trends
- Responsive chart containers
- Custom color schemes

### Receipt Upload

- Drag and drop interface
- File type validation (images, PDFs)
- File size limits (10MB)
- Upload progress tracking
- Simulated AI data extraction
- Error handling and retry functionality

## Development Features

- **Type Safety:** Full TypeScript support
- **Code Quality:** ESLint and Prettier configured
- **Performance:** Optimized bundle with Next.js
- **SEO:** Server-side rendering support
- **Accessibility:** ARIA labels and keyboard navigation

## Getting Started

The frontend integrates seamlessly with the existing tRPC backend. All API calls are ready to connect to your transaction router endpoints.

The application provides a solid foundation for a comprehensive personal finance management system with modern UI/UX best practices.
