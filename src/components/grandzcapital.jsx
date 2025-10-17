"use client";

import React from 'react';
import { ArrowRight, Shield, Globe, CheckCircle } from 'lucide-react';

export default function GrandCarzHero() {
  return (
    <div className="bg-black space-x-6 text-white min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen px-6 py-20">
          
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              {/* <p className="text-amber-400 text-lg font-semibold tracking-widest uppercase">Welcome to Excellence</p> */}
              <h1 className="text-3xl lg:text-4xl font-black leading-tight">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Grand Carz</span>
                <br />
                <span className="text-white">by Grand Capital</span>
              </h1>
              <p className="text-amber-600 text-2xl font-bold">Setting New Standards for Automotive Imports in Sri Lanka</p>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              An exclusive, direct vehicle importer and premier showroom redefining the standards of the local automotive market. We specialize in sourcing meticulously verified vehicles from trusted markets in Japan and global centers.
            </p>

            {/* Key Points */}
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Shield className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-400">Complete Integrity</h3>
                  <p className="text-gray-400 text-sm">Built on pillars of transparency and quality assurance</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Globe className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-400">Global Sourcing</h3>
                  <p className="text-gray-400 text-sm">Direct access to premium vehicles worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-400">End-to-End Service</h3>
                  <p className="text-gray-400 text-sm">From global auction to local registration</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all duration-300 transform hover:scale-105">
              Explore Our Fleet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side - Image/Graphic */}


        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-600/10 to-transparent"></div>
    </div>
  );
}