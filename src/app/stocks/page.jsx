"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Heart, Share2, MapPin, Gauge, Fuel, Calendar, DollarSign, ChevronLeft, ChevronRight, Eye, Phone, Mail, User, MapPinIcon } from 'lucide-react';

export default function StockPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleVehicles, setVisibleVehicles] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const vehicles = [
    {
      id: 1,
      name: "Toyota Camry 2023",
      brand: "TOYOTA",
      model: "Camry",
      modelCode: "XV70",
      year: 2023,
      price: "2,500,000",
      location: "Tokyo, Japan",
      posted: "2 months ago",
      views: 234,
      mileage: "15,000 km",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "2.5L V6",
      color: "Pearl White",
      category: "sedan",
      condition: "Excellent",
      cc: "2500",
      images: [
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609708536965-e7f24dd0f5f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605559424843-9e4c3dec8765?w=800&h=600&fit=crop"
      ],
      features: ["Sunroof", "Leather Seats", "360° Camera", "Adaptive Cruise Control", "Heated Seats", "Premium Sound System"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Luxury sedan with premium features, perfect for corporate use. Immaculate condition, well-maintained.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Petrol",
        mileage: "15,000 km",
        condition: "Excellent"
      }
    },
    {
      id: 2,
      name: "Honda CR-V 2022",
      brand: "HONDA",
      model: "CR-V",
      modelCode: "RW5",
      year: 2022,
      price: "2,200,000",
      location: "Osaka, Japan",
      posted: "3 weeks ago",
      views: 456,
      mileage: "22,000 km",
      fuelType: "Hybrid",
      transmission: "Automatic",
      engine: "2.0L Hybrid",
      color: "Midnight Blue",
      category: "suv",
      condition: "Excellent",
      cc: "2000",
      images: [
        "https://images.unsplash.com/photo-1606611013016-969c19d14ce9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1631176041140-4b8f7c98c4b4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1537821552189-2e3cc33d4f66?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ],
      features: ["All-Wheel Drive", "Eco Mode", "Power Liftgate", "Lane Keeping Assist", "Blind Spot Monitor", "Touchscreen Nav"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Versatile SUV with hybrid efficiency and advanced safety features. Perfect for families.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Hybrid",
        mileage: "22,000 km",
        condition: "Excellent"
      }
    },
    {
      id: 3,
      name: "Nissan Altima 2023",
      brand: "NISSAN",
      model: "Altima",
      modelCode: "L34",
      year: 2023,
      price: "2,100,000",
      location: "Tokyo, Japan",
      posted: "1 week ago",
      views: 678,
      mileage: "8,000 km",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "2.0L Turbo",
      color: "Charcoal Gray",
      category: "sedan",
      condition: "Like New",
      cc: "2000",
      images: [
        "https://images.unsplash.com/photo-1605559424843-9e4c3dec8765?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551355760-3f0bc4b7c4cc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1610809033353-e225e0f1f487?w=800&h=600&fit=crop"
      ],
      features: ["Turbo Engine", "Premium Cabin", "Smartphone Integration", "Forward Collision Warning", "Backup Camera", "Dual Zone Climate"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Sporty sedan with turbocharged performance. Barely driven.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Petrol",
        mileage: "8,000 km",
        condition: "Like New"
      }
    },
    {
      id: 4,
      name: "Mazda CX-5 2022",
      brand: "MAZDA",
      model: "CX-5",
      modelCode: "KF",
      year: 2022,
      price: "1,950,000",
      location: "Nagoya, Japan",
      posted: "10 days ago",
      views: 345,
      mileage: "18,500 km",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "2.5L NA",
      color: "Soul Red",
      category: "suv",
      condition: "Excellent",
      cc: "2500",
      images: [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1535732066927-ab7c9ab60908?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606611013016-969c19d14ce9?w=800&h=600&fit=crop"
      ],
      features: ["AWD System", "LED Headlights", "Power Seats", "Apple CarPlay", "Keyless Entry", "Panoramic Sunroof"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Stylish crossover with Japanese craftsmanship. Well-maintained.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Petrol",
        mileage: "18,500 km",
        condition: "Excellent"
      }
    },
    {
      id: 5,
      name: "Hyundai Elantra 2023",
      brand: "HYUNDAI",
      model: "Elantra",
      modelCode: "CN7",
      year: 2023,
      price: "1,650,000",
      location: "Seoul, Korea",
      posted: "5 days ago",
      views: 512,
      mileage: "5,000 km",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "1.8L NA",
      color: "Celestial Silver",
      category: "sedan",
      condition: "Like New",
      cc: "1800",
      images: [
        "https://images.unsplash.com/photo-1610809033353-e225e0f1f487?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609708536965-e7f24dd0f5f4?w=800&h=600&fit=crop"
      ],
      features: ["Modern Design", "Safety Suite", "Wireless Charging", "Rear Parking Sensors", "Alloy Wheels", "Rain Sensing Wipers"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Contemporary sedan with latest technology. Brand new condition.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Petrol",
        mileage: "5,000 km",
        condition: "Like New"
      }
    },
    {
      id: 6,
      name: "Subaru Outback 2023",
      brand: "SUBARU",
      model: "Outback",
      modelCode: "BT5",
      year: 2023,
      price: "2,350,000",
      location: "Tokyo, Japan",
      posted: "1 month ago",
      views: 789,
      mileage: "12,000 km",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "2.5L Boxer",
      color: "Deep Sea Blue",
      category: "suv",
      condition: "Excellent",
      cc: "2500",
      images: [
        "https://images.unsplash.com/photo-1606611013016-969c19d14ce9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1631176041140-4b8f7c98c4b4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1537821552189-2e3cc33d4f66?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
      ],
      features: ["Symmetrical AWD", "Box Space", "X-Mode Terrain", "EyeSight Driver Assist", "Roof Rails", "Premium Interior"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Adventure-ready SUV with exceptional all-terrain capability.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Petrol",
        mileage: "12,000 km",
        condition: "Excellent"
      }
    },
    {
      id: 7,
      name: "Toyota Prius Prime 2023",
      brand: "TOYOTA",
      model: "Prius Prime",
      modelCode: "Z60",
      year: 2023,
      price: "2,800,000",
      location: "Tokyo, Japan",
      posted: "2 weeks ago",
      views: 923,
      mileage: "3,000 km",
      fuelType: "Hybrid",
      transmission: "Automatic",
      engine: "1.8L Hybrid",
      color: "Ecru Gray",
      category: "hybrid",
      condition: "Like New",
      cc: "1800",
      images: [
        "https://images.unsplash.com/photo-1605559424843-9e4c3dec8765?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609708536965-e7f24dd0f5f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&h=600&fit=crop"
      ],
      features: ["Electric Mode", "Solar Roof", "LED Headlights", "Regenerative Braking", "Touchscreen", "Smart Climate"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Next-gen eco-friendly vehicle with premium features.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Hybrid",
        mileage: "3,000 km",
        condition: "Like New"
      }
    },
    {
      id: 8,
      name: "Mitsubishi Outlander 2022",
      brand: "MITSUBISHI",
      model: "Outlander",
      modelCode: "CW5W",
      year: 2022,
      price: "1,850,000",
      location: "Osaka, Japan",
      posted: "3 weeks ago",
      views: 456,
      mileage: "25,000 km",
      fuelType: "Petrol",
      transmission: "Automatic",
      engine: "2.4L MIVEC",
      color: "Titanium Gray",
      category: "suv",
      condition: "Very Good",
      cc: "2400",
      images: [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606611013016-969c19d14ce9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1535732066927-ab7c9ab60908?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ],
      features: ["7-Seater Option", "Adaptive Headlights", "Cruise Control", "USB Charging", "Alloy Wheels", "Roof Rack"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Spacious SUV perfect for family adventures.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Automatic",
        fuelType: "Petrol",
        mileage: "25,000 km",
        condition: "Very Good"
      }
    },
    {
      id: 9,
      name: "Lexus ES 2023",
      brand: "LEXUS",
      model: "ES",
      modelCode: "Z90",
      year: 2023,
      price: "3,200,000",
      location: "Toyota, Japan",
      posted: "5 days ago",
      views: 1250,
      mileage: "6,000 km",
      fuelType: "Hybrid",
      transmission: "CVT",
      engine: "2.5L Hybrid",
      color: "Obsidian",
      category: "luxury",
      condition: "Like New",
      cc: "2500",
      images: [
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1610809033353-e225e0f1f487?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551355760-3f0bc4b7c4cc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605559424843-9e4c3dec8765?w=800&h=600&fit=crop"
      ],
      features: ["Mark Levinson Audio", "Panoramic Sunroof", "Luxury Leather", "Climate Concierge", "Parking Assist", "Gesture Controls"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Ultimate luxury sedan with cutting-edge technology.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "CVT",
        fuelType: "Hybrid",
        mileage: "6,000 km",
        condition: "Like New"
      }
    },
    {
      id: 10,
      name: "Suzuki Swift 2023",
      brand: "SUZUKI",
      model: "Swift",
      modelCode: "ZC34S",
      year: 2023,
      price: "950,000",
      location: "Delhi, India",
      posted: "4 weeks ago",
      views: 234,
      mileage: "10,000 km",
      fuelType: "Petrol",
      transmission: "Manual",
      engine: "1.2L NA",
      color: "Red Pearl",
      category: "hatchback",
      condition: "Excellent",
      cc: "1200",
      images: [
        "https://images.unsplash.com/photo-1631176041140-4b8f7c98c4b4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1610809033353-e225e0f1f487?w=800&h=600&fit=crop"
      ],
      features: ["Compact Design", "Fuel Efficient", "Alloy Wheels", "Power Windows", "Central Locking", "ABS Brakes"],
      seller: "Grand Carz by Grand Capital",
      sellerRating: 4.9,
      description: "Economical hatchback perfect for city driving.",
      specifications: {
        registration: "Active",
        availability: "Available now",
        transmission: "Manual",
        fuelType: "Petrol",
        mileage: "10,000 km",
        condition: "Excellent"
      }
    }
  ];

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleVehicles((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesFilter = filter === 'all' || vehicle.category === filter;
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      sedan: 'bg-blue-600/20 text-blue-400',
      suv: 'bg-green-600/20 text-green-400',
      hybrid: 'bg-purple-600/20 text-purple-400',
      luxury: 'bg-yellow-600/20 text-yellow-400',
      hatchback: 'bg-pink-600/20 text-pink-400',
    };
    return colors[category] || colors.sedan;
  };

  const currentVehicle = selectedVehicle ? vehicles.find(v => v.id === selectedVehicle) : null;

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Background Elements */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

      {/* Header */}
      <section className="relative pt-50 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Our Inventory</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Premium Vehicles
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Browse our carefully selected collection of quality Japanese vehicles</p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-6 animate-slideInUp">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-gray-900 border border-amber-600/30 rounded-xl overflow-hidden group-hover:border-amber-500/50 transition-all duration-300">
                <Search className="w-5 h-5 text-amber-500 ml-4" />
                <input
                  type="text"
                  placeholder="Search by brand, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-4 outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['all', 'sedan', 'suv', 'hybrid', 'luxury', 'hatchback'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize text-sm ${
                    filter === cat
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-lg'
                      : 'bg-gray-900 border border-amber-600/30 text-amber-400 hover:border-amber-500/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle, idx) => (
              <div
                key={vehicle.id}
                data-id={`vehicle-${vehicle.id}`}
                onClick={() => {
                  setSelectedVehicle(vehicle.id);
                  setCurrentImageIndex(0);
                  setActiveTab('overview');
                }}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  visibleVehicles[`vehicle-${vehicle.id}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-600/30 group-hover:border-amber-500/50 overflow-hidden h-full flex flex-col transform group-hover:scale-105 transition-all duration-300">
                  {/* Image with Badge */}
                  <div className="relative h-48 bg-gray-800 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">HOT</div>
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(vehicle.category)}`}>
                        {vehicle.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Price */}
                    <p className="text-amber-400 font-bold text-xl mb-2">Rs. {vehicle.price}</p>

                    {/* Name */}
                    <h3 className="font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors text-lg">
                      {vehicle.name}
                    </h3>

                    {/* Quick Info */}
                    <div className="space-y-2 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-3 h-3" /> {vehicle.mileage}
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-3 h-3" /> {vehicle.fuelType}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> {vehicle.location}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-600/20 text-xs text-gray-500">
                      <span>{vehicle.posted}</span>
                      <span>{vehicle.views} views</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 mt-4 border-t border-amber-600/20">
                      <button
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-sm rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(vehicle.id);
                        }}
                        className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                          wishlist.includes(vehicle.id)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(vehicle.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Detail Modal - Detailed View */}
      {selectedVehicle && currentVehicle && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-gray-900 rounded-2xl border border-amber-600/30 max-w-6xl w-full max-h-[98vh] overflow-y-auto animate-slideInUp">
            {/* Header with Close */}
            <div className="sticky top-0 bg-black border-b border-amber-600/20 p-4 sm:p-6 flex justify-between items-center z-10">
              <div>
                <p className="text-amber-400 text-sm font-bold uppercase">{currentVehicle.brand}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{currentVehicle.name}</h2>
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
                  <img src={currentVehicle.images[currentImageIndex]} alt={currentVehicle.name} className="w-full h-96 object-cover" />
                  
                  {/* Navigation Arrows */}
                  {currentVehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + currentVehicle.images.length) % currentVehicle.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-amber-600/80 hover:bg-amber-500 rounded-full transition-all"
                      >
                        <ChevronLeft className="w-6 h-6 text-black" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % currentVehicle.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-amber-600/80 hover:bg-amber-500 rounded-full transition-all"
                      >
                        <ChevronRight className="w-6 h-6 text-black" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {currentVehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? 'border-amber-400 scale-110'
                          : 'border-gray-700 hover:border-amber-600/50'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-700">
                  {['Overview', 'Features', 'Specifications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                        activeTab === tab.toLowerCase()
                          ? 'text-amber-400 border-amber-400'
                          : 'text-gray-400 border-transparent hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed text-lg">{currentVehicle.description}</p>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-2">Condition</p>
                        <p className="text-white text-lg">{currentVehicle.condition}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {currentVehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800/50 border border-amber-600/20 rounded-lg">
                          <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">Model</p>
                        <p className="text-white font-semibold">{currentVehicle.model}</p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">Model Code</p>
                        <p className="text-white font-semibold">{currentVehicle.modelCode}</p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">Engine</p>
                        <p className="text-white font-semibold">{currentVehicle.engine}</p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">CC</p>
                        <p className="text-white font-semibold">{currentVehicle.cc} cc</p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">Transmission</p>
                        <p className="text-white font-semibold">{currentVehicle.transmission}</p>
                      </div>
                      <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                        <p className="text-amber-400 text-xs font-bold uppercase mb-2">Fuel Type</p>
                        <p className="text-white font-semibold">{currentVehicle.fuelType}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Info & CTA */}
              <div className="space-y-4">
                {/* Price Box */}
                <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-black">
                  <p className="text-sm font-bold uppercase tracking-widest opacity-90">Price</p>
                  <h3 className="text-4xl font-black mt-2">Rs. {currentVehicle.price}</h3>
                  <p className="text-sm mt-2 opacity-80">All inclusive, no hidden charges</p>
                </div>

                {/* Key Info Grid */}
                <div className="space-y-3">
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">Mileage</p>
                    <p className="text-white text-lg font-semibold">{currentVehicle.mileage}</p>
                  </div>
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">Year</p>
                    <p className="text-white text-lg font-semibold">{currentVehicle.year}</p>
                  </div>
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">Color</p>
                    <p className="text-white text-lg font-semibold">{currentVehicle.color}</p>
                  </div>
                  <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase mb-2">Location</p>
                    <p className="text-white text-lg font-semibold flex items-center gap-1"><MapPin className="w-4 h-4" />{currentVehicle.location}</p>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="bg-gray-800/50 border border-amber-600/20 rounded-lg p-4">
                  <p className="text-amber-400 text-xs font-bold uppercase mb-3">Seller</p>
                  <p className="text-white font-semibold mb-2">{currentVehicle.seller}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-4 ${i < Math.floor(currentVehicle.sellerRating) ? 'text-amber-400' : 'text-gray-600'}`}>★</div>
                    ))}
                    <span className="text-amber-400 text-sm ml-1">{currentVehicle.sellerRating}/5</span>
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
                  <p className="text-blue-400 text-sm font-semibold">✓ Verified Seller</p>
                  <p className="text-gray-400 text-xs mt-1">All details have been verified</p>
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