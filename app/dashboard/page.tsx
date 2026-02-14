import BookmarkForm from "../../components/bookmarks/BookmarkForm";
import BookmarkList from "../../components/bookmarks/BookmarkList";
import LogoutButton from "../../components/auth/LogoutButton";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 ">

      {/* Header */}
      <header className="flex justify-between items-center px-10 py-5 border-b border-white/10 backdrop-blur-lg">
        <h1 className="text-2xl font-bold tracking-wide">
          🔖 Smart Bookmark
        </h1>
        <LogoutButton />
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto mt-10 space-y-6 px-4">

        <BookmarkForm />
        <BookmarkList />

        <footer className="text-center text-sm text-gray-400 pt-10">
          © 2026 Smart Bookmark App
        </footer>
      </div>
    </div>
  );
}
