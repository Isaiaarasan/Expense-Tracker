import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-all duration-700">
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Expense Tracker with AI Categorization 💸
      </h1>
      <p className="max-w-xl text-center text-lg mb-8 opacity-80">
        Effortlessly track your personal or team expenses with smart AI-based
        categorization. Visualize insights through interactive charts and manage
        your finances seamlessly.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold"
        >
          Sign Up
        </Link>
      </div>

      <div className="mt-12 text-sm opacity-60">
        © {new Date().getFullYear()} Expense Tracker by Arasan
      </div>
    </div>
  );
}
