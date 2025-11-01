import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Expense Tracker with AI Categorization 💸</h1>

      <p>
        Effortlessly track your personal or team expenses with smart AI-based
        categorization. Visualize insights through interactive charts and manage
        your finances seamlessly.
      </p>

      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

      <div>© {new Date().getFullYear()} Expense Tracker by Arasan</div>
    </div>
  );
}
