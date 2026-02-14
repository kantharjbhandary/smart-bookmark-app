"use client";

import { supabase } from "../../lib/supabaseClient";

export default function GoogleLoginButton() {

const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
};

  return (
    <button
      onClick={login}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
    >
      Login with Google
    </button>
  );
}
