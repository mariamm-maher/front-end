import React from "react";

export default function DownloadSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Outer pulsing ring */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 opacity-30 animate-ping"></div>

        {/* Glowing spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-l-blue-400 animate-spin shadow-[0_0_20px_3px_rgba(16,144,241,0.6)]"></div>

        {/* Inner spinning core */}
        <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-blue-300 animate-spin-slow reverse-spin"></div>

        {/* Center glowing dot */}
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_8px_2px_rgba(16,144,241,0.7)]"></div>
      </div>

      {/* Optional loading text */}
    </div>
  );
}
