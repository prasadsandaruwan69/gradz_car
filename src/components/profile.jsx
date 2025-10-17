"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Award, Briefcase, BookOpen, Play } from 'lucide-react';

export default function LeadershipProfiles() {
  const [activeProfile, setActiveProfile] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState('next');

  const leaders = [
    {
      id: 0,
      name: "Mohan Somachandra",
      title: "Director / Chief Executive Officer (CEO)",
      bio: "Strategic visionary defining the company's direction with over two decades of executive excellence.",
      image: "M",
      color: "from-amber-600 to-amber-700",
      highlights: [
        { icon: Briefcase, text: "10+ years in corporate automotive management" },
        { icon: Briefcase, text: "10+ years banking and financial expertise" },
        { icon: BookOpen, text: "BCom (Marketing) & MBA from Royal College" }
      ],
      fullBio: "Mr Mohan Somachandra stands as the Director / CEO, defining the strategic vision and ensuring the execution of all corporate mandates. His leadership is the cornerstone of the company's stability and forward trajectory. His capability for strategic leadership is underpinned by over two decades of executive experience, seamlessly integrating high-level financial mastery with complex corporate operations management. Mr Mohan spent over 10 years in the corporate management of a leading automobile brand in Sri Lanka, translating strategic objectives into high-performing, scalable operational frameworks. This operational insight is built upon a solid foundation of over 10 years as a Banker, guaranteeing profound strategic grasp of fiscal health, capital allocation, and risk management. By leveraging this unique dual-sector expertise, Mr Mohan drives a culture of strategic alignment, financial discipline, and operational excellence throughout the organization."
    },
    {
      id: 1,
      name: "Janaka Suriyapperuma",
      title: "Director - Marketing",
      bio: "Marketing strategist with 23+ years driving success across diverse sectors and luxury segments.",
      image: "J",
      color: "from-amber-500 to-amber-600",
      highlights: [
        { icon: Award, text: "23 years progressive multi-sector management" },
        { icon: Briefcase, text: "Expert in FMCG, luxury, and high-value asset marketing" },
        { icon: BookOpen, text: "CIM UK & NIBM postgraduate credentials" }
      ],
      fullBio: "Janaka Suriyapperuma serves as the Director - Marketing, bringing over 23 years of progressive, multi-sector management experience. His career trajectory reflects proven capability for strategic leadership and market mastery across diverse business environments in Sri Lanka and offshore. His background encompasses complex projects and technology marketing, diverse market acumen across FMCG and consumer durables, and strategic management in property development. This breadth of expertise ensures a holistic, data-driven, and creatively executed marketing approach tailored to the luxury segment, promising innovative engagement with sophisticated clientele of imported brand-new vehicles."
    },
    {
      id: 2,
      name: "Sajeewa Karunanayake",
      title: "Manager - Key Accounts",
      bio: "Dynamic sales leader with 10+ years driving revenue growth and building high-performing teams.",
      image: "S",
      color: "from-amber-400 to-amber-500",
      highlights: [
        { icon: Briefcase, text: "10+ years automobile industry expertise" },
        { icon: Award, text: "Proven track record in retail and fleet sales" },
        { icon: Briefcase, text: "Specialist in customer relationship management" }
      ],
      fullBio: "Mr. Sajeewa Karunanayake is a dynamic and results-driven Sales Manager with over 10 years of experience in the automobile industry, specializing in dealership operations, team leadership, and customer relationship management. With a proven track record in exceeding sales targets and driving revenue growth, he excels at building high-performing teams. His expertise spans both retail and fleet sales, with deep knowledge in financing, trade-ins, and digital lead generation, making him instrumental in Grand Carz's Key Accounts division."
    }
  ];

  // Auto-play slider
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setDirection('next');
      setActiveProfile((prev) => (prev + 1) % leaders.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const current = leaders[activeProfile];

  const nextProfile = () => {
    setDirection('next');
    setActiveProfile((prev) => (prev + 1) % leaders.length);
    setAutoPlay(false);
  };

  const prevProfile = () => {
    setDirection('prev');
    setActiveProfile((prev) => (prev - 1 + leaders.length) % leaders.length);
    setAutoPlay(false);
  };

  const goToProfile = (idx) => {
    setDirection(idx > activeProfile ? 'next' : 'prev');
    setActiveProfile(idx);
    setAutoPlay(false);
  };

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Our Leadership
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Driven by visionary leaders with decades of combined expertise in automotive excellence and strategic innovation</p>
        </div>

        {/* Main Slider Section */}
        <div className="relative">
          {/* Profile Card - Smooth Animated Slider */}
          <div className="relative mb-12">
            <div className="relative group overflow-hidden">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-3xl blur-2xl opacity-100"></div>

              {/* Slider Container */}
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden border border-amber-600/30 p-8 md:p-12 min-h-[500px]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-600/20 to-transparent rounded-bl-3xl"></div>

                {/* Animated Content - Smooth Transitions */}
                <div key={activeProfile} className="relative z-10">
                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out ${
                    direction === 'next' 
                      ? 'animate-slideInRight' 
                      : 'animate-slideInLeft'
                  }`}>
                    {/* Left - Avatar and Name */}
                    <div className="flex flex-col justify-center">
                      <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center mb-6 shadow-xl transform transition-transform duration-700 hover:scale-110`}>
                        <span className="text-6xl font-black text-black">{current.image}</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-2 text-white transition-all duration-700">{current.name}</h3>
                      <p className="text-xl text-amber-400 font-semibold transition-all duration-700">{current.title}</p>
                    </div>

                    {/* Middle & Right - Bio and Description */}
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <p className="text-gray-300 text-lg leading-relaxed mb-6 italic border-l-4 border-amber-500 pl-6 transition-all duration-700">
                        "{current.bio}"
                      </p>

                      <p className="text-gray-400 leading-relaxed mb-6 transition-all duration-700">
                        {current.fullBio}
                      </p>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {current.highlights.map((highlight, idx) => {
                          const IconComponent = highlight.icon;
                          return (
                            <div 
                              key={idx} 
                              className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-amber-600/20 hover:border-amber-500/50 transition-all duration-300 transform hover:scale-105"
                              style={{
                                animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`
                              }}
                            >
                              <IconComponent className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300">{highlight.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="absolute bottom-6 right-6 flex gap-3 z-20">
                <button
                  onClick={prevProfile}
                  className="p-3 bg-amber-600 hover:bg-amber-500 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-amber-600/50"
                  aria-label="Previous profile"
                >
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <button
                  onClick={nextProfile}
                  className="p-3 bg-amber-600 hover:bg-amber-500 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-amber-600/50"
                  aria-label="Next profile"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                {leaders.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToProfile(idx)}
                    className={`rounded-full transition-all duration-500 cursor-pointer ${
                      idx === activeProfile ? 'bg-amber-400 w-8 h-2' : 'bg-gray-600 w-2 h-2 hover:bg-amber-300'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members Navigation Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaders.map((leader, idx) => (
              <button
                key={idx}
                onClick={() => goToProfile(idx)}
                className={`relative group p-6 rounded-2xl transition-all duration-500 border-2 transform hover:scale-105 ${
                  activeProfile === idx
                    ? `bg-gradient-to-br ${leader.color} border-amber-300 shadow-xl`
                    : 'bg-gray-900 border-gray-800 hover:border-amber-600/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`text-center ${activeProfile === idx ? 'text-black' : 'text-amber-400'}`}>
                    <div className="text-sm font-semibold uppercase tracking-wider opacity-80">
                      {leader.title.split(' ')[0]}
                    </div>
                    <div className={`text-2xl font-bold mt-3 ${activeProfile === idx ? 'text-black' : 'text-white'}`}>
                      {leader.name.split(' ')[0]}
                    </div>
                  </div>
                  {activeProfile === idx && (
                    <div className={`mt-4 flex items-center justify-center gap-2 font-semibold text-black`}>
                      <Play className="w-4 h-4 animate-pulse" /> Active
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div> */}

          {/* Auto-play Toggle */}
          {/* <div className="flex justify-center">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
                autoPlay
                  ? 'bg-amber-600 border-amber-500 text-black hover:shadow-lg hover:shadow-amber-600/50'
                  : 'bg-gray-900 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black'
              }`}
            >
              {autoPlay ? '⏸ Pause Auto-play' : '▶ Resume Auto-play'}
            </button>
          </div> */}
        </div>
      </div>

      <style jsx>{`
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </section>
  );
}