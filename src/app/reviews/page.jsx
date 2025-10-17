"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, Users, Award } from 'lucide-react';

export default function CustomerReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [filter, setFilter] = useState('all');
  const [visibleReviews, setVisibleReviews] = useState({});
  const [autoPlay, setAutoPlay] = useState(true);

  const allReviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "Business Owner",
      rating: 5,
      text: "Grand Carz exceeded all my expectations. The entire process from selection to delivery was seamless and transparent. I got exactly the vehicle I wanted at a price that was unbeatable. Highly recommended!",
      image: "R",
      category: "business",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      name: "Priya Silva",
      title: "Corporate Executive",
      rating: 5,
      text: "The professionalism and attention to detail at Grand Carz is exceptional. The team understood my requirements perfectly and delivered a premium vehicle that I'm absolutely thrilled with. Best investment ever!",
      image: "P",
      category: "corporate",
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: "Kamal Fernando",
      title: "Fleet Manager",
      rating: 5,
      text: "Managing a fleet of vehicles, I was skeptical about reliability. Grand Carz proved me wrong with their consistent quality and after-sales support. Their team went above and beyond expectations.",
      image: "K",
      category: "fleet",
      date: "3 weeks ago",
      verified: true
    },
    {
      id: 4,
      name: "Anjali Perera",
      title: "Family Owner",
      rating: 5,
      text: "After comparing multiple dealers, Grand Carz stood out for their honesty and customer-centric approach. Every question was answered patiently. My family loves our new vehicle!",
      image: "A",
      category: "family",
      date: "1 week ago",
      verified: true
    },
    {
      id: 5,
      name: "Suresh Menon",
      title: "Import Business Owner",
      rating: 5,
      text: "As someone familiar with the import business, I can confidently say Grand Carz's partnership with Grand Auto Japan is genuine and value-adding. Exceptional service quality and reliability.",
      image: "S",
      category: "business",
      date: "10 days ago",
      verified: true
    },
    {
      id: 6,
      name: "Nisha Jayasinghe",
      title: "Corporate Buyer",
      rating: 5,
      text: "The experience was phenomenal! From the initial consultation to the handover, everything was handled with utmost professionalism. Grand Carz is my first choice for premium vehicles.",
      image: "N",
      category: "corporate",
      date: "2 weeks ago",
      verified: true
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "1,200+", icon: Users },
    { label: "Average Rating", value: "4.9/5", icon: Star },
    { label: "Success Rate", value: "98%", icon: TrendingUp }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % allReviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleReviews((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredReviews = filter === 'all' ? allReviews : allReviews.filter(r => r.category === filter);
  const current = allReviews[activeReview];

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % allReviews.length);
    setAutoPlay(false);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + allReviews.length) % allReviews.length);
    setAutoPlay(false);
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Background Elements */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

      {/* Header Section */}
      <section className="relative pt-50 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">What Our Customers Say</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Customer Testimonials
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Real stories from satisfied customers who found their perfect vehicle through Grand Carz</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-amber-600/30 hover:border-amber-500/50 transition-all duration-300 transform hover:scale-105 animate-slideInUp"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-4xl font-black text-amber-400 mb-2">{stat.value}</p>
                  <p className="text-gray-400 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Review Carousel */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-amber-400">Featured Review</h2>

          {/* Carousel Container */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Review Content */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-amber-600/30 p-8 md:p-12 h-full flex flex-col justify-between min-h-96 transform transition-all duration-500">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-amber-500 opacity-50" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xl text-gray-200 leading-relaxed mb-8 italic font-light min-h-24">
                    "{current.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="border-t border-amber-600/30 pt-6">
                    <p className="text-lg font-bold text-white">{current.name}</p>
                    <p className="text-amber-400 font-semibold mb-2">{current.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{current.date}</span>
                      {current.verified && (
                        <span className="flex items-center gap-1 text-amber-500">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Avatar and Details */}
              <div className="space-y-8">
                {/* Large Avatar */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:scale-110 animate-float">
                    <span className="text-8xl font-black text-black">{current.image}</span>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 font-semibold">Review {activeReview + 1} of {allReviews.length}</p>
                    <button onClick={() => setAutoPlay(!autoPlay)} className="text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors">
                      {autoPlay ? '⏸ Pause' : '▶ Resume'}
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 rounded-full"
                      style={{ width: `${((activeReview + 1) / allReviews.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={prevReview}
                    className="p-3 bg-amber-600 hover:bg-amber-500 rounded-full transition-all transform hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6 text-black" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-3 bg-amber-600 hover:bg-amber-500 rounded-full transition-all transform hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 text-black" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex gap-2 justify-center flex-wrap">
                  {allReviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveReview(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === activeReview
                          ? 'bg-amber-500 w-8 h-3'
                          : 'bg-gray-700 w-3 h-3 hover:bg-gray-600'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Grid Reviews */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-8">All Customer Reviews</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['all', 'business', 'corporate', 'fleet', 'family'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize ${
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

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review, idx) => (
              <div
                key={review.id}
                data-id={`review-${review.id}`}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  visibleReviews[`review-${review.id}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-600/30 group-hover:border-amber-500/50 p-6 h-full flex flex-col transform group-hover:scale-105 transition-all duration-300">
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-black">{review.image}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{review.name}</p>
                      <p className="text-sm text-amber-400">{review.title}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                    "{review.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400 border-t border-amber-600/20 pt-4">
                    <span>{review.date}</span>
                    {review.verified && <span className="text-amber-500 font-semibold">✓ Verified</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-gray-300 text-xl mb-10">Join hundreds of satisfied customers who found their perfect vehicle with Grand Carz</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all transform hover:scale-105">
              Browse Our Fleet
            </button>
            <button className="px-10 py-4 border-2 border-amber-600 text-amber-400 font-bold text-lg rounded-lg hover:bg-amber-600/10 transition-all">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}