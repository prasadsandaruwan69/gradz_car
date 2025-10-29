"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GrandCarzTachometerLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      <div className="relative flex flex-col items-center gap-8">
        {/* Tachometer */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient */}
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="50%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>
            </defs>

            {/* Outer Bezel */}
            <circle
              cx="150"
              cy="150"
              r="145"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="10"
            />

            {/* Inner Dial */}
            <circle cx="150" cy="150" r="130" fill="#0a0a0a" />

            {/* Scale Ticks (Bottom arc only) */}
            {[...Array(41)].map((_, i) => {
              const startAngle = 210; // left-bottom
              const endAngle = 330; // right-bottom
              const sweep = 120; // bottom semicircle area
              const angle = startAngle + (i * (sweep / 40));
              const isMajor = i % 5 === 0;
              const length = isMajor ? 25 : 12;
              const stroke = isMajor ? "#f59e0b" : "#4b5563";
              const width = isMajor ? 3 : 1.5;

              const rad = (angle * Math.PI) / 180;
              const x1 = 150 + 105 * Math.cos(rad);
              const y1 = 150 + 105 * Math.sin(rad);
              const x2 = 150 + (105 + length) * Math.cos(rad);
              const y2 = 150 + (105 + length) * Math.sin(rad);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth={width}
                />
              );
            })}

            {/* Numbers (Bottom arc 0–8) */}
        {/* Scale Ticks (Top arc, 120°–420° sweep for realistic tachometer) */}
{[...Array(41)].map((_, i) => {
  const startAngle = 120; // left-top
  const endAngle = 420;   // right-top
  const sweep = endAngle - startAngle;
  const angle = startAngle + (i * (sweep / 40));
  const isMajor = i % 5 === 0;
  const length = isMajor ? 25 : 12;
  const stroke = isMajor ? "#f59e0b" : "#4b5563";
  const width = isMajor ? 3 : 1.5;

  const rad = (angle * Math.PI) / 180;
  const x1 = 150 + 105 * Math.cos(rad);
  const y1 = 150 + 105 * Math.sin(rad);
  const x2 = 150 + (105 - length) * Math.cos(rad);
  const y2 = 150 + (105 - length) * Math.sin(rad);

  return (
    <line
      key={i}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={width}
    />
  );
})}

{/* Numbers (Top arc 0–8) */}
{[...Array(9)].map((_, num) => {
  const startAngle = 120;
  const endAngle = 420;
  const sweep = endAngle - startAngle;
  const angle = startAngle + (num * (sweep / 8));
  const rad = (angle * Math.PI) / 180;
  const x = 150 + 125 * Math.cos(rad);
  const y = 150 + 125 * Math.sin(rad);

  return (
    <text
      key={num}
      x={x}
      y={y}
      fill="#f59e0b"
      fontSize="22"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
      className="font-mono drop-shadow-md"
    >
      {num}
    </text>
  );
})}


            {/* x1000 RPM */}
            <text
              x="150"
              y="100"
              fill="#fbbf24"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              className="font-mono"
            >
              ×1000 RPM
            </text>

            {/* Center Hub */}
            <circle
              cx="150"
              cy="150"
              r="12"
              fill="#1f2937"
              stroke="#f59e0b"
              strokeWidth="3"
            />
          </svg>

          {/* Animated Needle – bottom arc sweep */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformOrigin: "150px 150px" }}
            animate={{ rotate: [210, 330, 210] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-1.5 h-44 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full shadow-lg"
              style={{
                boxShadow:
                  "0 0 20px rgba(251, 191, 36, 0.9), 0 0 40px rgba(251, 191, 36, 0.6)",
                transform: "translateX(-50%)",
              }}
            />
            <div className="absolute top-0 left-1/2 w-5 h-5 bg-amber-500 rounded-full -translate-x-1/2 shadow-lg" />
          </motion.div>

          {/* Glow Pulse */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.3)",
                "0 0 50px rgba(251, 191, 36, 0.7)",
                "0 0 20px rgba(251, 191, 36, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            Grand Carz
          </h1>
          <p className="text-sm text-amber-400 font-medium tracking-widest mt-1">
            LUXURY IN MOTION
          </p>

          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-amber-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-amber-900/10"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}
