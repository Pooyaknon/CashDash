# CashDash - Smart Expense & Budget Tracker

**CashDash** is a high-performance personal finance management application designed to help users track their income and expenses with ease. Built with modern web technologies, it provides a secure, real-time experience for managing daily financial activities.

---

## Key Features
- **Secure Authentication:** Full user lifecycle management including Sign Up, Login, and Password Recovery (Forgot/Update Password) using Supabase Auth.
- **Personalized Data:** Each user has a private profile, ensuring financial records are isolated and secure.
- **Transaction Management:** - Add Income and Expenses with descriptions, categories, and timestamps.
  - Quick-delete functionality for inaccurate entries.
- **Dynamic Dashboard:** Real-time balance calculation and daily transaction summaries.
- **Historical Insights:** A calendar-integrated view to navigate through previous spending and earning history.
- **Responsive Design:** Fully optimized for both desktop and mobile browsing.

---

## Tech Stack
- **Frontend:** [React.js](https://react.dev/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend-as-a-Service:** [Supabase](https://supabase.com/) (PostgreSQL Database & Auth)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

---

## Project Structure
```
src/
├── assets/         # Project logos and static images
├── components/     # Reusable UI components (e.g., ProtectedRoute for Auth guards)
├── pages/          # Main views: Home, Login, SignUp, AddIncome, AddExpense, etc.
├── services/       # API logic: Supabase client, authService, and transactionService
├── styles/         # Global CSS and Tailwind styling
└── main.jsx        # Application bootstrap and entry point

```

---

## Installation & Getting Started

To set up the project locally after pulling the latest changes, please follow these steps:

### 1. Clone & Pull

After you `git pull` or clone the repository to your local machine:

### 2. Install Dependencies (Mandatory)

Since the `node_modules` folder is not included in the repository, **you must run the following command** to install all necessary libraries:

```bash
# Install all required packages
npm install

```

### 3. Environment Variables

Create a file named `.env.local` in the root directory. Copy the keys from `.env.example` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```

### 4. Run Development Server

Once the installation is complete, start the app:

```bash
# Start the local development server
npm run dev

```

Access the application at: `http://localhost:5173`

---

## ⚠️ Important Guidelines for Developers

* **Node.js Version:** Please ensure you are using Node.js version **22.12.0** (check `.nvmrc`).
* **Database Integrity:** Actions performed in the development environment directly affect the live Supabase database. Exercise caution when deleting records.
* **Best Practices:** * Always run `npm install` after pulling new changes to ensure your local environment is up-to-date with new packages.
* Create feature branches for new updates (`feat/your-feature`) before merging into the main branch.



---

*Created and maintained by the CashDash Team.*