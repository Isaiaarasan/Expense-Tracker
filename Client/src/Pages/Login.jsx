import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://expense-tracker-hwrt.onrender.com/api/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("Login successful!");
    navigate("/dashboard");

  } catch (err) {
    if (err.response) {
      // Server returned error
      alert(err.response.data.error || "Invalid credentials");
    } else {
      // Network or other error
      alert("Server error. Please try again later.");
    }
    console.error("Login error:", err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-200 relative p-4 overflow-hidden">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 sm:p-10 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg space-y-7
                   animate__animated animate__bounce" // <-- ANIMATION ADDED
      >
        <div className="text-center">
          <img
            src="image.png"
            alt="AI.Tracker Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">
            Log in to your AI.Tracker account.
          </p>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg shadow-inner
                     text-white placeholder-gray-400
                     focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-200"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg shadow-inner
                     text-white placeholder-gray-400
                     focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-200"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg
                     transition duration-300 transform hover:scale-[1.01] active:scale-95"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 pt-2">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
