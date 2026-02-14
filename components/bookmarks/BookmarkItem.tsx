"use client";

import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

export default function BookmarkItem({ bookmark, onDelete }: any) {

  // 🔥 SAFE hostname extraction
  let hostname = "";
  let favicon = "";

  try {
    const parsed = new URL(bookmark.url);
    hostname = parsed.hostname;
    favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch (err) {
    hostname = "Invalid URL";
  }

  const deleteBookmark = async () => {
    if (!confirm("Delete this bookmark?")) return;

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmark.id);

    if (!error) {
      toast.success("Deleted successfully");
      onDelete?.(bookmark.id);
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex justify-between items-center bg-slate-800/70 backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:scale-[1.01] transition-all">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* Logo */}
        {favicon && (
          <img
            src={favicon}
            alt="logo"
            className="w-8 h-8 rounded-md"
          />
        )}

        <div>
          <a
            href={bookmark.url}
            target="_blank"
            className="text-indigo-400 font-medium hover:underline"
          >
            {bookmark.title}
          </a>

          <p className="text-xs text-gray-400">
            {hostname}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 text-sm">
        <button className="text-yellow-400 hover:text-yellow-300">
          Update
        </button>

        <button
          onClick={deleteBookmark}
          className="text-red-400 hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
