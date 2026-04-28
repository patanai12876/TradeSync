"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdNotifications, MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/traders", label: "Marketplace" },
    { href: "/trades", label: "Trades" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 tracking-tight"
        >
          TradeSync
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition ${
                isActive(l.href)
                  ? "text-teal-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {l.label}

              {/* ACTIVE UNDERLINE */}
              {isActive(l.href) && (
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-teal-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* NOTIFICATIONS */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <MdNotifications size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
          </Link>

          {/* PROFILE (KEEPED ✔) */}
          <Link
            href="/profile"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white flex items-center justify-center text-sm font-bold shadow-sm hover:shadow-md transition"
          >
            J
          </Link>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700"
          >
            {open ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-5 pb-4 space-y-2 border-t border-gray-100 bg-white">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block text-sm py-2 ${
                isActive(l.href)
                  ? "text-teal-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* PROFILE MOBILE */}
          <Link
            href="/profile"
            className="block text-sm py-2 text-gray-700"
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
}