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

    if (!error) {
      setBookmarks(data || []);
    }
  };

  useEffect(() => {
    fetchBookmarks();

   
    const interval = setInterval(() => {
      fetchBookmarks();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      {bookmarks.map((b) => (
        <BookmarkItem
          key={b.id}
          bookmark={b}
          onDelete={(id: number) =>
            setBookmarks((prev) =>
              prev.filter((item) => item.id !== id)
            )
          }
        />
      ))}
    </div>
  );
}
