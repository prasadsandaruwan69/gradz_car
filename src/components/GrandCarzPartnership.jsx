"use client";

import React, { useState, useEffect } from 'react';
import { Globe, CheckCircle2, Zap, Shield, Truck, Award, ArrowRight, X } from 'lucide-react';

export default function GrandCarzPartnership() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [sidePanel, setSidePanel] = useState(null);
  const [visibleItems, setVisibleItems] = useState({});

  // Track visible elements
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const experienceHighlights = [
    {
      icon: Globe,
      title: "Direct Japanese Access",
      description: "Seamless connection to premier Japanese auction houses",
      details: "Tap into the largest vehicle inventory in the world with direct access to major Japanese auction houses."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Stringent Japanese quality standards on every vehicle",
      details: "Every vehicle undergoes rigorous inspection to meet our premium quality standards."
    },
    {
      icon: Zap,
      title: "Competitive Pricing",
      description: "Direct sourcing power for exceptional value",
      details: "Eliminate intermediaries and enjoy pricing that reflects true market value."
    },
    {
      icon: Truck,
      title: "Reliable Logistics",
      description: "Versatile delivery network ensuring on-time shipment",
      details: "Our partner network ensures your vehicle arrives safely and on schedule."
    }
  ];

  const partnerStrengths = [
    {
      title: "Unrivaled Sourcing",
      description: "Direct access to virtually all Japanese auction houses enables hand-selected vehicles matching buyer specifications precisely",
      icon: "🎯",
      details: "With access to 5+ major Japanese auction centers, we hand-select only the best vehicles."
    },
    {
      title: "Competitive Pricing",
      description: "Direct access and established volume allow sourcing of vehicles at highly competitive prices",
      icon: "💰",
      details: "Volume partnerships allow us to negotiate the best possible pricing for our clients."
    },
    {
      title: "Quality Assurance",
      description: "Highest quality standards maintained for every vehicle selected and exported",
      icon: "✓",
      details: "300-point vehicle inspection ensures only premium vehicles reach your showroom."
    },
    {
      title: "Reliable Logistics",
      description: "Versatile and flexible delivery and shipping network ensures vehicles supplied within agreed schedule",
      icon: "📦",
      details: "Flexible shipping options with real-time tracking for complete peace of mind."
    }
  ];

  const advantages = [
    {
      title: "Import Directly",
      description: "Facilitate the direct import of vehicles from Japan via Grand Auto Japan",
      number: "01",
      details: "Skip the middleman. Direct sourcing from Japan ensures authenticity and value."
    },
    {
      title: "Secure Best Value",
      description: "Benefit from highly competitive pricing through direct sourcing power",
      number: "02",
      details: "Our partnerships guarantee pricing that's 15-25% more competitive than traditional channels."
    },
    {
      title: "Guaranteed Quality",
      description: "Purchase with confidence knowing vehicles meet stringent Japanese standards",
      number: "03",
      details: "Every vehicle comes with full transparency and comprehensive quality certification."
    }
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section - Partnership */}
      <section className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-20 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div>
                <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>Exclusive Partnership</p>
                <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Connected to Japan</span>
                </h1>
                <p className="text-2xl text-amber-600 font-bold mb-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>Powered by Grand Auto Japan Co. Ltd</p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Grand Carz, established by Grand Capital, brings a new standard of excellence to the Sri Lankan vehicle import market. We offer a direct, seamless, and competitive route for buyers to acquire high-quality Japanese vehicles.
              </p>

              <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                {[
                  { title: "Exclusive Affiliate Status", desc: "Official Sales Agent for Sri Lanka of Grand Auto Japan Co. Ltd" },
                  { title: "Direct Import Route", desc: "Seamless connection bypassing intermediaries" },
                  { title: "International Trust", desc: "Partnership with globally recognized vehicle exporter" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 transform hover:translate-x-2 transition-transform">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all transform hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                Explore Partnership <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right - Partner Logo & Info */}
            <div className="relative animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-3xl blur-2xl opacity-50"></div>

                {/* Partner Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-amber-600/30 p-12 text-center hover:border-amber-500/50 transition-all duration-300 group cursor-pointer transform hover:scale-105">
                  <div className="space-y-8">
                    {/* Logo Placeholder */}
                    <div className="space-y-4 animate-float">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <div className="text-center">
                          <p className="text-5xl font-black text-black">GA</p>
                          <p className="text-xs text-black font-bold mt-2">Japan</p>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-amber-400">Grand Auto Japan Co. Ltd</h3>
                      <p className="text-sm text-gray-400">Tokyo, Japan</p>
                    </div>

                    <div className="space-y-4 text-left">
                      <p className="text-amber-400 font-bold uppercase text-xs tracking-widest">Why They're Different</p>
                      <ul className="space-y-3 text-gray-300">
                        {["Serving customers worldwide", "Decades of experience", "Trusted by global importers", "Unmatched auction access"].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 transform hover:translate-x-2 transition-transform">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights - Expandable Cards */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp" data-id="highlights-header">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">The Grand Carz Advantage</p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent mb-6">
              Experience Center Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceHighlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              const isExpanded = expandedCard === idx;
              
              return (
                <div
                  key={idx}
                  data-id={`highlight-${idx}`}
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                  className={`group relative cursor-pointer transition-all duration-500 transform ${
                    visibleItems[`highlight-${idx}`] ? 'animate-slideInUp' : 'opacity-0'
                  } ${isExpanded ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-amber-600/30 group-hover:border-amber-500/50 h-full transition-all duration-300 transform group-hover:scale-105 ${isExpanded ? 'scale-100' : ''}`}>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{highlight.title}</h3>
                      <p className="text-gray-400">{highlight.description}</p>
                      
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-amber-600/30 animate-slideInUp">
                          <p className="text-amber-300 font-semibold mb-4">Learn More:</p>
                          <p className="text-gray-300 leading-relaxed">{highlight.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Strengths - Side Panel */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp" data-id="strengths-header">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Grand Auto Japan</p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent mb-6">
              Why We're Unmatched
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Our Japanese partner's strengths become your advantages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerStrengths.map((strength, idx) => (
              <div
                key={idx}
                data-id={`strength-${idx}`}
                onClick={() => setSidePanel(sidePanel === idx ? null : idx)}
                className={`relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-amber-600/30 hover:border-amber-500/50 transition-all duration-500 group cursor-pointer transform hover:scale-105 ${
                  visibleItems[`strength-${idx}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10 flex gap-6">
                  <div className="text-4xl flex-shrink-0 group-hover:scale-125 transition-transform">{strength.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-400 mb-3">{strength.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{strength.description}</p>
                    {sidePanel === idx && (
                      <div className="mt-4 pt-4 border-t border-amber-600/30 animate-slideInUp">
                        <p className="text-amber-300 font-semibold text-sm">{strength.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grand Carz Advantages - Modal/Overlay */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-20 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp" data-id="advantages-header">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">For Sri Lankan Buyers</p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent mb-6">
              What You Get
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, idx) => (
              <div
                key={idx}
                data-id={`advantage-${idx}`}
                onClick={() => setSidePanel(sidePanel === `adv-${idx}` ? null : `adv-${idx}`)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  visibleItems[`advantage-${idx}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-amber-600/30 p-8 h-full flex flex-col justify-between transform group-hover:scale-105 transition-all duration-300">
                  {/* Number */}
                  <div className="text-6xl font-black text-amber-600/30 mb-4">{advantage.number}</div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">{advantage.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{advantage.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-amber-500 font-semibold group-hover:translate-x-2 transition-transform">
                    Learn more <ArrowRight className="w-5 h-5 ml-2" />
                  </div>

                  {/* Expanded Content */}
                  {sidePanel === `adv-${idx}` && (
                    <div className="mt-6 pt-6 border-t border-amber-600/30 animate-slideInUp">
                      <p className="text-amber-300 font-semibold mb-2">Details:</p>
                      <p className="text-gray-300">{advantage.details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-40 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 left-40 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center animate-fadeInUp" data-id="cta-section">
          <h2 className="text-4xl md:text-3xl font-black mb-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Your Gateway to Premium Japanese Vehicles
          </h2>
          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            Grand Carz is the trusted gateway to importing the exact Japanese vehicle you require, at a price that ensures exceptional value.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all transform hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              Browse Our Fleet
            </button>
            <button className="px-10 py-4 border-2 border-amber-600 text-amber-400 font-bold text-lg rounded-lg hover:bg-amber-600/10 transition-all animate-slideInUp" style={{ animationDelay: '0.3s' }}>
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
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