# Expense Tracker

A simple and modern Expense Tracker web application built with Next.js and React. This app allows you to add, edit, and delete expenses, and keeps track of your total spending. Expenses are persisted in your browser's local storage.

## Features

- Add new expenses with name, amount, and date
- Edit or delete existing expenses
- View a running total of all expenses
- Responsive and clean UI
- Data persists in local storage

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [date-fns](https://date-fns.org/) for date formatting
- [Lucide React](https://lucide.dev/) for icons
- [Radix UI](https://www.radix-ui.com/) for dialogs
- Tailwind CSS for styling

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd 15_expense_tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- `components/expense-tracker.tsx` — Main Expense Tracker component
- `components/ui/` — Reusable UI components (Button, Dialog, Input, etc.)
- `app/` — Next.js app directory
- `lib/` — Utility functions

## Customization
- You can modify the initial expenses in `components/expense-tracker.tsx`.
- Styling can be adjusted via Tailwind classes in the component files.

## License

This project is open source and available under the [MIT License](LICENSE).
