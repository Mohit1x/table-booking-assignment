"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-4 h-20 bg-white shadow-sm sticky top-0 z-40">
      <div className="text-2xl font-bold">BookEasy</div>

      <nav className="flex gap-4">
        <Link
          href="/booking-form"
          className={`px-4 py-2 rounded-full ${
            pathname === "/booking-form"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Booking form
        </Link>
        <Link
          href="/timeline"
          className={`px-4 py-2 rounded-full ${
            pathname === "/timeline"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-500"
          }`}
        >
          TimeLine
        </Link>
      </nav>
    </header>
  );
}

export default Header;
