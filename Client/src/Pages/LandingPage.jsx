import { Link } from "react-router-dom";
import { useState } from "react";

// --- Mini-Chart Component ---
const MiniChart = () => (
  <>
    <div className="font-semibold text-white text-sm">Monthly Trend</div>
    <div className="flex items-end h-16 space-x-1.5 mt-2">
      <div className="w-1/4 h-[40%] bg-emerald-400 rounded-sm opacity-70"></div>
      <div className="w-1/4 h-[60%] bg-emerald-400 rounded-sm opacity-70"></div>
      <div className="w-1/4 h-[80%] bg-emerald-400 rounded-sm opacity-70"></div>
      <div className="w-1/4 h-[50%] bg-emerald-400 rounded-sm opacity-70"></div>
    </div>
  </>
);

// --- Mini-StatCard Component ---
const MiniStatCard = ({ title, value, icon }) => (
  <>
    <div className="text-xs font-medium text-gray-400 uppercase">{title}</div>
    <div className="flex items-center justify-between mt-1">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-2xl">{icon}</div>
    </div>
  </>
);

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    setMousePos({ x: -y * 10, y: x * 10 });
  };

  const sceneStyle = {
    transform: `rotateX(${mousePos.x}deg) rotateY(${mousePos.y}deg)`,
    transition: "transform 0.1s ease-out",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-gray-200 p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* --- BACKGROUND (The Aurora) --- */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-slate-900 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* --- 3D SCENE (BACKGROUND) --- */}
      <div className="absolute inset-0 -z-10 w-full h-full [perspective:1200px] flex items-center justify-center">
        <div
          className="relative w-full h-full"
          style={{ ...sceneStyle, transformStyle: "preserve-3d" }}
        >
          {/* Card 1: Main Dashboard (Back-left) - REDUCED SIZE */}
          <div
            className="absolute top-[10%] left-[5%] w-[45%] lg:w-[28%] rounded-2xl bg-white/5 border border-white/10 
                       shadow-2xl backdrop-blur-lg animate-float-slow"
            style={{
              transform: "translateZ(-150px) rotateX(10deg) rotateY(-10deg)",
            }}
          >
            <img
              src="image_50a12d.png" // CORRECTED FILENAME
              alt="Dashboard Mock-up"
              className="w-full h-auto rounded-lg opacity-80"
            />
          </div>

          {/* Card 2: Transaction Item (Food) (Mid-right) - REDUCED SIZE */}
          <div
            className="absolute top-[20%] right-[10%] w-[40%] lg:w-[22%] rounded-xl bg-white/5 border border-white/10 
                       shadow-2xl backdrop-blur-lg p-3 animate-float-fast"
            style={{
              transform: "translateZ(50px) rotateX(-5deg) rotateY(5deg)",
            }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg shadow-inner">
                🍔
              </div>
              <div className="flex-grow mx-2">
                <div className="font-semibold text-white text-sm">
                  Zomato Order
                </div>
                <div className="text-xs text-gray-300">Food</div>
              </div>
              <div className="text-sm font-bold text-emerald-300">₹450</div>
            </div>
          </div>

          {/* Card 3: "AI Brain" Orb (Front-left) */}
          <div
            className="absolute top-[40%] left-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 
                       border border-white/10 shadow-2xl backdrop-blur-lg animate-float-reverse
                       flex items-center justify-center text-4xl text-white opacity-90"
            style={{ transform: "translateZ(200px) rotateY(20deg)" }}
          >
            🧠
          </div>

          {/* Card 4: Transaction Item (Travel) (Back-right) - REDUCED SIZE */}
          <div
            className="absolute top-[50%] right-[5%] w-[45%] lg:w-[25%] rounded-xl bg-white/5 border border-white/10 
                       shadow-2xl backdrop-blur-lg p-3 animate-float-slow"
            style={{
              transform: "translateZ(-120px) rotateX(5deg) rotateY(15deg)",
              animationDelay: "1.5s",
            }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg shadow-inner">
                ✈️
              </div>
              <div className="flex-grow mx-2">
                <div className="font-semibold text-white text-sm">
                  Flight Ticket
                </div>
                <div className="text-xs text-gray-300">Travel</div>
              </div>
              <div className="text-sm font-bold text-emerald-300">₹8200</div>
            </div>
          </div>

          {/* Card 5: Mini Chart Widget (Mid-left) - REDUCED SIZE */}
          <div
            className="absolute top-[65%] left-[5%] w-[35%] lg:w-[20%] rounded-xl bg-white/5 border border-white/10 
                       shadow-2xl backdrop-blur-lg p-3 animate-float-fast"
            style={{
              transform: "translateZ(80px) rotateX(-10deg) rotateY(-5deg)",
              animationDelay: "0.5s",
            }}
          >
            <MiniChart />
          </div>

          {/* Card 6: Category List (Bottom-right) - REDUCED SIZE */}
          <div
            className="absolute bottom-[5%] right-[12%] w-[35%] lg:w-[22%] rounded-xl bg-white/5 border border-white/10 
                       shadow-2xl backdrop-blur-lg animate-float-slow"
            style={{
              transform: "translateZ(60px) rotateX(10deg) rotateY(10deg)",
              animationDelay: "2s",
            }}
          >
            <img
              src="image_5befaf.png" 
              alt="Category List"
              className="w-full h-auto rounded-lg opacity-50"
            />
          </div>

          {/* Card 7: Mini Stat Card (Front-bottom-left) - REDUCED SIZE */}
          <div
            className="absolute bottom-[10%] left-[30%] w-[30%] lg:w-[15%] rounded-xl bg-white/5 border border-white/10 
                       shadow-2xl backdrop-blur-lg p-3 animate-float-reverse"
            style={{
              transform: "translateZ(180px) rotateX(5deg) rotateY(-10deg)",
              animationDelay: "1s",
            }}
          >
            <MiniStatCard title="Total Spent" value="₹12K" icon="💰" />
          </div>
        </div>
      </div>

      {/* --- Header (Foreground) --- */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center space-x-3">
          <img
            src="image_512854.png"
            alt="AI.Tracker Logo"
            className="w-10 h-10"
          />{" "}
          {/* CORRECTED FILENAME */}
          <span className="text-2xl font-bold text-white">AI.Tracker</span>
        </div>
        <div>
          <Link
            to="/login"
            className="px-5 py-2 font-semibold text-white bg-white/10 border border-white/20 rounded-lg shadow-lg backdrop-blur-lg
                       transition duration-300 transform hover:scale-105 hover:bg-white/20"
          >
            Login
          </Link>
        </div>
      </header>

      {/* --- Hero Text (Foreground) --- */}
      <main className="flex-1 flex flex-col items-center justify-center text-center z-10 p-6">
        <h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight
                       animate__animated animate__fadeInDown"
        >
          Your Money,
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-purple-400 animate-text-gradient">
            Instantly Understood.
          </span>
        </h1>
        <p
          className="text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto
                       animate__animated animate__fadeInUp animate__delay-1s"
        >
          AI.Tracker is the first expense tracker with a brain. It automatically
          categorizes, finds insights, and puts you in control.
        </p>

        {/* Animated Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6
                        animate__animated animate__fadeInUp animate__delay-2s"
        >
          <Link
            to="/signup"
            className="px-10 py-3 font-semibold text-slate-900 bg-emerald-400 rounded-lg shadow-lg
                       transition duration-300 transform hover:scale-105 hover:bg-emerald-300"
          >
            Get Started for Free
          </Link>
        </div>
      </main>

      {/* --- Footer (Foreground) --- */}
      <footer className="w-full text-center p-6 text-sm text-gray-500 z-10">
        &copy; {new Date().getFullYear()} Expense Tracker by Arasan
      </footer>
    </div>
  );
}
