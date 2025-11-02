import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https.expense-tracker-hwrt.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Signup failed");
        return;
      }
      alert("Signup successful! Please login.");
      localStorage.removeItem("user"); // Clear any old user data
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-200 relative p-4">
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-8 sm:p-10 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg space-y-7"
      >
        <div className="text-center">
          <img
            src="image.png"
            alt="AI.Tracker Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
          <p className="text-gray-400 mt-2">
            Join the future of expense tracking.
          </p>
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg shadow-inner
                     text-white placeholder-gray-400
                     focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-200"
        />

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
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400 pt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
