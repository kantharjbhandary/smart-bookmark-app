"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/dashboard"); // 🔥 replace prevents flicker
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

  {/* 🔥 Animated Round Loader */}
  <div className="relative w-14 h-14 mb-6">
    <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>

    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
  </div>

  {/* Text */}
  <p className="text-slate-300 text-sm tracking-wide animate-pulse">
    Checking session...
  </p>

</div>

    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
      <div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-xl text-white w-[420px] text-center">
        <h1 className="text-3xl font-bold mb-4">
          🚀 Smart Bookmark
        </h1>
        <p className="text-gray-300 mb-6">
          Save your favorite links privately
        </p>
        <GoogleLoginButton />
      </div>
    </main>
  );
}
