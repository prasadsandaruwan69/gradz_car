"use client";
import { useState, useEffect } from "react";

import Link from "next/link";


import dynamic from "next/dynamic";

const Grandcarcapital = dynamic(() => import("./grandzcapital"), { ssr: false });
const VisionMission = dynamic(() => import("./VisionMition"), { ssr: false });
const GrandCarzPartnership = dynamic(() => import("./GrandCarzPartnership"), { ssr: false });
const Profile = dynamic(() => import("./profile"), { ssr: false });

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
<div>
    <section className="relative min-h-screen pt-20 flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg-vidio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 px-4 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Shining Title */}
   

        {/* Subtitle with shine effect */}
        <h1 className="text-4xl md:text-6xl font-semibold text-amber-500 mb-6 tracking-wider">
          <span className="inline-block ">
            Luxury Meets Performance
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
          Experience the perfect fusion of elegance, innovation, and power. 
          Every Gradz Car is meticulously crafted to deliver unparalleled comfort 
          and exhilarating performance on every journey.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/stocks">
          <button className="group relative px-8 py-4 bg-amber-500 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
            <span className="relative z-10"> Explore Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          </Link>
          <Link href="/contacts">
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
            Contact Us
          </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
     
      </div>


    </section>
    <Grandcarcapital />
    <VisionMission />
    <GrandCarzPartnership />
    <Profile />
    </div>
  );
}