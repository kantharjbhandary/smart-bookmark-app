"use client";

import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

/* ✅ Proper Props Typing */
type Props = {
  bookmark: any;
  onDelete?: (id: number) => void;
};

export default function BookmarkItem({ bookmark, onDelete }: Props) {
  /* ===============================
     SAFE HOSTNAME + FAVICON
  =================================*/
  let hostname = "";
  let favicon = "";

  try {
    const parsed = new URL(bookmark.url);
    hostname = parsed.hostname;
    favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    hostname = "Invalid URL";
  }

  /* ===============================
     DELETE BOOKMARK
  =================================*/
  const deleteBookmark = async () => {
    if (!confirm("Delete this bookmark?")) return;

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmark.id);

    if (error) {
      console.error(error);
      toast.error("Delete failed");
      return;
    }

    toast.success("Deleted successfully");

    // ⭐ Tell parent to remove item instantly
    onDelete?.(bookmark.id);
  };

  /* ===============================
     UI
  =================================*/
  return (
    <div className="flex justify-between items-center bg-slate-800/70 backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:scale-[1.01] transition-all">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

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
            rel="noopener noreferrer"
            className="text-indigo-400 font-medium hover:underline"
          >
            {bookmark.title}
          </a>

          <p className="text-xs text-gray-400">
            {hostname}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex gap-3 text-sm">
        {/* UPDATE BUTTON (UI only for now) */}
        <button className="text-yellow-400 hover:text-yellow-300">
          Update
        </button>

        {/* DELETE BUTTON */}
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
