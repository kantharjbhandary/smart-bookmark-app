"use client";

import LogoutButton from "../auth/LogoutButton";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-b border-white/10 shadow-lg">
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
          
          <span className="text-white">🔖</span>

          <span
            className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Smart Bookmark
          </span>

        </h1>

        <LogoutButton />

      </div>
    </div>
  );
}
