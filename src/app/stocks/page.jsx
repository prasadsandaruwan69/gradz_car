"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  Heart,
  Share2,
  MapPin,
  Gauge,
  Fuel,
  ChevronLeft,
  ChevronRight,
  Eye,
  Phone,
  Mail,
} from "lucide-react";

export default function StockPage() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleVehicles, setVisibleVehicles] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${API_URL}/api/vehicles`);
        if (!response.ok) throw new Error("Failed to fetch vehicles");
        const data = await response.json();
        console.log("Fetched vehicles:", data);
        setVehicles(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [API_URL]);

  // Scroll animation for vehicle cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleVehicles((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll("[data-id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [vehicles]);

  // Filter and search logic - ONLY SEARCH
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (!searchTerm) return true;

    const matchesSearch =
      vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.stock_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.chassis_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${vehicle.make} ${vehicle.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      sedan: "bg-blue-600/20 text-blue-400",
      suv: "bg-green-600/20 text-green-400",
      hybrid: "bg-purple-600/20 text-purple-400",
      luxury: "bg-yellow-600/20 text-yellow-400",
      hatchback: "bg-pink-600/20 text-pink-400",
    };
    return colors[category?.toLowerCase()] || "bg-gray-600/20 text-gray-400";
  };

  const currentVehicle = selectedVehicle
    ? vehicles.find((v) => v.id === selectedVehicle)
    : null;


  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Header */}
      <section className="relative pt-50 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">
              Our Inventory
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Premium Vehicles
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Browse our carefully selected collection of quality Japanese
              vehicles
            </p>
          </div>

          {/* Search Bar Only */}
          <div className="max-w-4xl mx-auto animate-slideInUp">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-gray-900 border border-amber-600/30 rounded-xl overflow-hidden group-hover:border-amber-500/50 transition-all duration-300">
                <Search className="w-5 h-5 text-amber-500 ml-4" />
                <input
                  type="text"
                  placeholder="Search by brand, model, stock number, chassis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-4 outline-none text-white placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mr-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              Found {filteredVehicles.length} vehicle
              {filteredVehicles.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                No vehicles found matching your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle, idx) => (
                <div
                  key={vehicle.id}
                  data-id={`vehicle-${vehicle.id}`}
                  onClick={() => {
                    setSelectedVehicle(vehicle.id);
                    setCurrentImageIndex(0);
                    setActiveTab("overview");
                  }}
                  className={`relative group cursor-pointer transition-all duration-500 transform ${
                    visibleVehicles[`vehicle-${vehicle.id}`]
                      ? "animate-slideInUp"
                      : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-600/30 group-hover:border-amber-500/50 overflow-hidden h-full flex flex-col transform group-hover:scale-105 transition-all duration-300">
                    {/* Image with Badge */}
                    <div className="relative h-48 bg-gray-800 overflow-hidden">
                      <img
                        src={
                          vehicle.images && vehicle.images[0]
                            ? `${API_URL}${vehicle.images[0]}`
                            : "/placeholder.jpg"
                        }
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "/placeholder.jpg";
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {vehicle.status || "Available"}
                      </div>
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(
                            vehicle.vehicle_type
                          )}`}
                        >
                          {vehicle.vehicle_type || "Vehicle"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Price */}
                      <p className="text-amber-400 font-bold text-xl mb-2">
                        {vehicle.fob_price
                          ? `Rs. ${Number(vehicle.fob_price).toLocaleString()}`
                          : "Contact for Price"}
                      </p>

                      {/* Name */}
                      <h3 className="font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors text-lg">
                        {vehicle.make} {vehicle.model}{" "}
                        {vehicle.manufacture_year || ""}
                      </h3>

                      {/* Quick Info */}
                      <div className="space-y-2 mb-4 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-3 h-3" />{" "}
                          {vehicle.mileage
                            ? `${vehicle.mileage.toLocaleString()} km`
                            : "Mileage N/A"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel className="w-3 h-3" />{" "}
                          {vehicle.fuel || "Fuel N/A"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />{" "}
                          {vehicle.stock_location || "Location N/A"}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-3 border-t border-amber-600/20 text-xs text-gray-500">
                        <span>Stock: {vehicle.stock_number || "N/A"}</span>
                        <span>{vehicle.views || 0} views</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 mt-4 border-t border-amber-600/20">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-sm rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" /> View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(vehicle.id);
                          }}
                          className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                            wishlist.includes(vehicle.id)
                              ? "bg-red-600 text-white"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlist.includes(vehicle.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && currentVehicle && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-gray-900 rounded-2xl border border-amber-600/30 max-w-6xl w-full max-h-[98vh] overflow-y-auto animate-slideInUp">
            {/* Header with Close */}
            <div className="sticky top-0 bg-black border-b border-amber-600/20 p-4 sm:p-6 flex justify-between items-center z-10">
              <div>
                <p className="text-amber-400 text-sm font-bold uppercase">
                  {currentVehicle.make}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {currentVehicle.make} {currentVehicle.model}{" "}
                  {currentVehicle.manufacture_year || ""}
                </h2>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 bg-amber-600 hover:bg-amber-500 rounded-full transition-all text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* Left - Images */}
              <div className="lg:col-span-2 space-y-4">
                {/* Main Image */}
                <div className="relative rounded-xl overflow-hidden bg-gray-800">
                  <img
                    src={
                      currentVehicle.images &&
                      currentVehicle.images[currentImageIndex]
                        ? `${API_URL}${currentVehicle.images[currentImageIndex]}`
                        : "/placeholder.jpg"
                    }
                    alt={`${currentVehicle.make} ${currentVehicle.model}`}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                  {/* Navigation Arrows */}
                  {currentVehicle.images &&
                    currentVehicle.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) =>
                                (prev - 1 + currentVehicle.images.length) %
                                currentVehicle.images.length
                            )
                          }
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-amber-600/80 hover:bg-amber-500 rounded-full transition-all"
                        >
                          <ChevronLeft className="w-6 h-6 text-black" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) =>
                                (prev + 1) % currentVehicle.images.length
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-amber-600/80 hover:bg-amber-500 rounded-full transition-all"
                        >
                          <ChevronRight className="w-6 h-6 text-black" />
                        </button>
                      </>
                    )}
                </div>

                {/* Thumbnail Gallery */}
                {currentVehicle.images && currentVehicle.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {currentVehicle.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex
                            ? "border-amber-400 scale-110"
                            : "border-gray-700 hover:border-amber-600/50"
                        }`}
                      >
                        <img
                          src={`${API_URL}${img}`}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.jpg";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 border-b border-gray-700">
                  {["Overview", "Features", "Specifications"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-semibold transition-all border-b-2 ${
                        activeTab === tab.toLowerCase()
                          ? "text-amber-400 border-amber-400"
                          : "text-gray-400 border-transparent hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {currentVehicle.remarks || "No description available"}
                      </p>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-2">
                          Condition
                        </p>
                        <p className="text-white text-lg">
                          {currentVehicle.condition || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-2">
                          Stock Information
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-400">Stock Number</p>
                            <p className="text-white font-semibold">
                              {currentVehicle.stock_number || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Chassis Number</p>
                            <p className="text-white font-semibold">
                              {currentVehicle.chassis_no || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {currentVehicle.accessories_options &&
                        Object.entries(currentVehicle.accessories_options).map(
                          ([category, features]) =>
                            Object.entries(features)
                              .filter(([_, value]) => value)
                              .map(([key], idx) => (
                                <div
                                  key={`${category}-${idx}`}
                                  className="flex items-center gap-3 p-3 bg-gray-800/50 border border-amber-600/20 rounded-lg"
                                >
                                  <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-300 text-sm">
                                    {key
                                      .replace(/_/g, " ")
                                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                                  </span>
                                </div>
                              ))
                        )}
                      {(!currentVehicle.accessories_options ||
                        Object.values(currentVehicle.accessories_options).every(
                          (cat) => Object.values(cat).every((v) => !v)
                        )) && (
                        <p className="text-gray-400 col-span-full text-center py-8">
                          No features available
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Model
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.model || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Model Code
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.model_code || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Engine
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.engine_model || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          CC
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.engine_cc || "N/A"} cc
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Transmission
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.transmission || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Fuel Type
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.fuel || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Body Type
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.body_type || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Doors
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.doors || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Seating
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.seating_capacity || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                          Grade
                        </p>
                        <p className="text-white font-semibold">
                          {currentVehicle.grade || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Info & CTA */}
              <div className="space-y-4">
                {/* Price Box */}
                <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-black">
                  <p className="text-sm font-bold uppercase tracking-widest opacity-90">
                    FOB Price
                  </p>
                  <h3 className="text-4xl font-black mt-2">
                    {currentVehicle.fob_price
                      ? `Rs. ${Number(
                          currentVehicle.fob_price
                        ).toLocaleString()}`
                      : "Contact Us"}
                  </h3>
                  <p className="text-sm mt-2 opacity-80">
                    FOB price, contact for total cost
                  </p>
                </div>

                {/* Key Info Grid */}
                <div className="space-y-3">
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                      Mileage
                    </p>
                    <p className="text-white text-lg font-semibold">
                      {currentVehicle.mileage
                        ? `${currentVehicle.mileage.toLocaleString()} km`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                      Year
                    </p>
                    <p className="text-white text-lg font-semibold">
                      {currentVehicle.manufacture_year || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                      Color
                    </p>
                    <p className="text-white text-lg font-semibold">
                      {currentVehicle.exterior_color || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">
                      Location
                    </p>
                    <p className="text-white text-lg font-semibold flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {currentVehicle.stock_location || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                  <p className="text-amber-400 text-xs font-bold uppercase mb-3">
                    Seller
                  </p>
                  <p className="text-white font-semibold mb-2">
                    {currentVehicle.sales_person || "Grand Carz"}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-amber-400">
                        ★
                      </div>
                    ))}
                    <span className="text-amber-400 text-sm ml-1">4.9/5</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4 border-t border-amber-600/20">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-600/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" /> Call Now
                  </button>
                  <button className="w-full px-6 py-4 border-2 border-amber-600 text-amber-400 font-bold rounded-lg hover:bg-amber-600/10 transition-all flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" /> Email Seller
                  </button>
                  <button className="w-full px-6 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" /> Share
                  </button>
                </div>

                {/* Safety Info */}
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 text-center">
                  <p className="text-blue-400 text-sm font-semibold">
                    ✓ Verified Seller
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    All details have been verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
