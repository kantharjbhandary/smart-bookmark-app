"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

export default function BookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title || !url) {
      toast.error("Title and URL required");
      return;
    }

    setLoading(true);

    try {
      // 🔥 CALL EDGE FUNCTION ONLY
      const res = await fetch(
        "https://ajsgqpmjgrrjfkgbzkbt.supabase.co/functions/v1/validate-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization:
              "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await res.json();

      console.log("Edge response:", data);

      // ❌ STOP HERE IF INVALID
      if (!data.valid) {
        toast.error("🚫 Invalid or unreachable website");
        setLoading(false);
        return; // ⭐ VERY IMPORTANT
      }

      // ✅ GET USER
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        toast.error("User not logged in");
        setLoading(false);
        return;
      }

      // ✅ INSERT ONLY IF EDGE VALID = TRUE
      const { error } = await supabase.from("bookmarks").insert({
        title,
        url,
        user_id: user.id,
      });

      if (error) {
        toast.error("Insert failed");
      } else {
        toast.success("✅ Bookmark added");
        setTitle("");
        setUrl("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Validation failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-white/10 shadow-lg">

      <h2 className="text-lg text-white mb-4 font-semibold">
        Add New Bookmark
      </h2>

      <input
        className="bg-slate-800 border border-white/10 text-white p-2 w-full mb-3 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="bg-slate-800 border border-white/10 text-white p-2 w-full mb-4 rounded"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={addBookmark}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded-lg"
      >
        {loading ? "Validating..." : "Add Bookmark"}
      </button>
    </div>
  );
}
