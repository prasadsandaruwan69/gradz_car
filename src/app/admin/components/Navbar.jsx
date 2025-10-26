"use client";
import { Menu, Bell, LogOut } from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="bg-black text-amber-400 z-40 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-amber-400 hover:text-amber-300"
        >
          <Menu size={26} />
        </button>
        <h2 className="hidden md:block text-lg font-semibold">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="hover:text-amber-300 cursor-pointer" />
        <LogOut className="hover:text-amber-300 cursor-pointer" />
      </div>
    </header>
  );
}
