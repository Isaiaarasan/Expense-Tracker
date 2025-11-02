import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-gray-200 p-4 relative overflow-hidden">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Expense Tracker with AI Categorization 💸
        </h1>

        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Effortlessly track your personal or team expenses with smart AI-based
          categorization. Visualize insights and manage your finances
          seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login"
            className="px-10 py-3 font-semibold text-white bg-white/10 border border-white/20 rounded-lg shadow-lg backdrop-blur-lg
                       transition duration-300 transform hover:scale-105 hover:bg-white/20"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-10 py-3 font-semibold text-slate-900 bg-emerald-400 rounded-lg shadow-lg
                       transition duration-300 transform hover:scale-105 hover:bg-emerald-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>

      <footer className="mt-20 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Expense Tracker by Arasan
      </footer>
    </div>
  );
}
