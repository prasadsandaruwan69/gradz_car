"use client";
import React from 'react';

function VisionMission() {
  return (
    <section className="relative bg-black text-white   overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Section */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-transparent opacity-10 rounded-bl-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-amber-300">Vision</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-200 font-light">
                  To be the undisputed market leader and the benchmark for ethical practice and excellence in Sri Lanka's premium automotive import industry, continuously setting new standards for vehicle quality and customer experience.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mission Section */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-400 to-transparent opacity-10 rounded-tr-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-amber-300">Mission</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-200 font-light">
                  To provide reliable, transparent, and superior vehicle import solutions by leveraging direct global partnerships and uncompromising quality verification processes, thereby empowering our clients with accessible luxury and assured value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission;