import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      {/* The <Outlet> renders the child route.
        For example, if you are on "/dashboard", this will render <Dashboard />.
        If you are on "/expenselist", this will render <ExpenseList />.
      */}
      <Outlet />
    </div>
  );
}
