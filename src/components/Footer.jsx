"use client";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-zinc-950 text-gray-300 border-t border-zinc-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Gradz Car Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Experience luxury and performance like never before. Gradz Car delivers excellence in every drive.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group">
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group">
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group">
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group">
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group">
                <Youtube className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm flex items-center group">
                  <span className="w-0 h-0.5 bg-amber-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm flex items-center group">
                  <span className="w-0 h-0.5 bg-amber-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm flex items-center group">
                  <span className="w-0 h-0.5 bg-amber-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm flex items-center group">
                  <span className="w-0 h-0.5 bg-amber-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm flex items-center group">
                  <span className="w-0 h-0.5 bg-amber-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Luxury Drive, Auto City, AC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="tel:0128004567890" className="text-gray-400 hover:text-amber-500 transition-colors">
                  (012) 800 456 789
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="mailto:info@gradzcar.com" className="text-gray-400 hover:text-amber-500 transition-colors">
                  info@gradzcar.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers, updates and exclusive deals.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="w-full px-4 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            {subscribed && (
              <p className="text-green-500 text-sm mt-2 animate-pulse">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} <span className="text-amber-500 font-semibold">Gradz Car</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Privacy Policy
              </a>
              <span className="text-zinc-700">|</span>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Terms of Service
              </a>
              <span className="text-zinc-700">|</span>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}