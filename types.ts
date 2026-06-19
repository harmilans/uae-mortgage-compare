import Link from "next/link";

export default function Header() {
  return (
    <header className="text-white shadow-md" style={{ backgroundColor: "#1e3a5f" }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: "#c9a84c", color: "#1e3a5f" }}>
            UAE
          </div>
          <span className="text-lg font-bold">MortgageCompare</span>
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-yellow-300 transition-colors">Compare</Link>
          <Link href="/admin/rates" className="hover:text-yellow-300 transition-colors">Rate Admin</Link>
        </nav>
      </div>
    </header>
  );
}
