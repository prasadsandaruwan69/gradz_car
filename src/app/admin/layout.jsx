"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

//   useEffect(() => {
//     const isAdmin = localStorage.getItem("isAdmin"); // or cookie/session
//     if (!isAdmin) {
//       router.push("/admin/login");
//     }
//   }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin sidebar / topbar can go here */}
      {children}
    </div>
  );
}
