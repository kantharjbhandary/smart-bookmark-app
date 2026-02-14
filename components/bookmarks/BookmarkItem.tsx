"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

export default function BookmarkItem({ bookmark, onDelete }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url);
  const [loading, setLoading] = useState(false);

  // SAFE hostname + favicon
  let hostname = "";
  let favicon = "";

  try {
    const parsed = new URL(bookmark.url);
    hostname = parsed.hostname;
    favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
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

  const updateBookmark = async () => {
    if (!title || !url) {
      toast.error("Title and URL required");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("bookmarks")
      .update({
        title: title.trim(),
        url: url.trim(),
      })
      .eq("id", bookmark.id);

    setLoading(false);

    if (error) {
      toast.error("Update failed");
    } else {
      toast.success("Updated successfully");
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-slate-800/70 backdrop-blur-lg p-4 rounded-xl border border-white/10">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 w-full">
        {favicon && (
          <img src={favicon} alt="logo" className="w-8 h-8 rounded-md" />
        )}

        {isEditing ? (
          <div className="w-full space-y-2">
            <input
              className="w-full bg-slate-900 text-white p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full bg-slate-900 text-white p-2 rounded"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-indigo-400 font-medium hover:underline"
            >
              {bookmark.title}
            </a>
            <p className="text-xs text-gray-400">{hostname}</p>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 text-sm ml-4">
        {isEditing ? (
          <>
            <button
              onClick={updateBookmark}
              disabled={loading}
              className="text-green-400 hover:text-green-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-400 hover:text-yellow-300"
            >
              Update
            </button>
            <button
              onClick={deleteBookmark}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
