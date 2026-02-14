"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false }); 

    console.log("Bookmarks Data:", data);
    console.log("Bookmarks Error:", error);

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-2">
      {bookmarks.map((b) => (
        <BookmarkItem
          key={b.id}
          bookmark={b}
          onDelete={(id: string) =>
            setBookmarks((prev) => prev.filter((item) => item.id !== id))
          }
        />
      ))}
    </div>
  );
}
