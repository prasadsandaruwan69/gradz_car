"use client";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-gray-100">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
