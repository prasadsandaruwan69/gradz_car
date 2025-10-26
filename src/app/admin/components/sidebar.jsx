"use client";
import Link from "next/link";
import { Home, Car, FileText, Layers } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({ isCollapsed }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin" },
    { name: "Vehicles", icon: <Car size={20} />, path: "/admin/vehicles" },
    { name: "Reports", icon: <FileText size={20} />, path: "/admin/reports" },
    { name: "Content", icon: <Layers size={20} />, path: "/admin/content" },
  ];

  return (
    <aside
      className={`bg-gradient-to-b from-black via-gray-900 to-amber-950 text-amber-200 shadow-lg 
      transition-all duration-300 h-screen flex flex-col border-r border-amber-700/30
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-4 border-b border-amber-600/40 text-center">
        <h1
          className={`text-xl font-bold text-amber-400 transition-all duration-300 ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
        >
          Admin Panel
        </h1>
      </div>

      <ul className="flex-1 space-y-2 mt-4">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`flex items-center gap-3 p-3 mx-2 rounded-md transition-all duration-200 
                ${
                  pathname === item.path
                    ? "bg-amber-500 text-black font-semibold"
                    : "hover:bg-amber-700/40 hover:text-white"
                }
              `}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
