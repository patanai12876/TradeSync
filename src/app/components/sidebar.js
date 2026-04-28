"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleMenu }) => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Deposit", href: "/deposit" },
    { name: "Withdraw", href: "/withdraw" },
    { name: "Transactions", href: "/transactions" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="text-xl font-bold text-slate-900">
            TradeSync
          </div>
          <button onClick={toggleMenu} className="text-slate-400 hover:text-slate-600 transition">
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleMenu}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                pathname === item.href
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-200">
          <Link
            href="/login"
            className="block w-full text-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            Logout
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;