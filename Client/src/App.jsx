import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout"; // <-- Import the layout
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import ExpenseList from "./Pages/ExpenseList";
import AddExpensePage from "./Pages/AddExpensePage";
import ReportsPage from "./Pages/ReportsPage";
import "./index.css"; 

// --- ADD THIS LINE ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Private Routes --- */}
        {/* All routes inside AppLayout will share the sidebar */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenselist" element={<ExpenseList />} />
          <Route path="/add-expense" element={<AddExpensePage />} />
          <Route path="/reports" element={<ReportsPage/>}/>
          {/* <Route path="/reports" element={<YourReportsPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
