"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Phone,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // 🧠 Track scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path) =>
    `text-sm tracking-wide uppercase transition-colors font-medium ${
      pathname === path
        ? "text-amber-500"
        : "text-white hover:text-amber-500"
    }`;

  return (
    <nav
      className={`bg-zinc-900 text-white fixed w-full z-50 top-0 transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-zinc-950 border-b px-8 border-zinc-800">
        <div className="container mx-auto py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4 text-zinc-400 hover:text-amber-500 transition-colors duration-200" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 text-zinc-400 hover:text-amber-500 transition-colors duration-200" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 text-zinc-400 hover:text-amber-500 transition-colors duration-200" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 text-zinc-400 hover:text-amber-500 transition-colors duration-200" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 text-zinc-400 hover:text-amber-500 transition-colors duration-200" />
                </a>
              </div>
              <span className="text-zinc-400 hidden lg:inline">
                Free shipping on all domestic orders with coupon code{" "}
                <span className="text-amber-500 font-semibold">'Watches2018'</span>
              </span>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex gap-2 text-amber-500">
                <Phone size={18} />
                <span className="text-sm font-semibold">
                  Free Support: 076 190 88 88, 011 429 45 94
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center py-5">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
            </div>

            {/* Links */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="/" className={linkClasses("/")}>Home</a>
              <a href="/stocks" className={linkClasses("/stocks")}>Stocks</a>
              <a href="/news" className={linkClasses("/news")}>News</a>
              <a href="/reviews" className={linkClasses("/reviews")}>Customer Reviews</a>
              <a href="/contacts" className={linkClasses("/contacts")}>Contact Us</a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-amber-500 transition-colors p-2 hover:bg-zinc-800 rounded-full">
                <Search size={22} />
              </button>
              <button
                className="lg:hidden text-white p-2 hover:bg-zinc-800 rounded-md transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-900 border-t border-zinc-800">
          <a href="/" className="block px-6 py-3 text-amber-500 hover:bg-zinc-800 border-b border-zinc-800 transition-colors">Home</a>
          <a href="/stocks" className="block px-6 py-3 text-white hover:bg-zinc-800 hover:text-amber-500 border-b border-zinc-800 transition-colors">Stocks</a>
          <a href="/news" className="block px-6 py-3 text-white hover:bg-zinc-800 hover:text-amber-500 border-b border-zinc-800 transition-colors">News</a>
          <a href="/reviews" className="block px-6 py-3 text-white hover:bg-zinc-800 hover:text-amber-500 border-b border-zinc-800 transition-colors">Customer Reviews</a>
          <a href="/contacts" className="block px-6 py-3 text-white hover:bg-zinc-800 hover:text-amber-500 transition-colors">Contact</a>
        </div>
      )}
    </nav>
  );
}
