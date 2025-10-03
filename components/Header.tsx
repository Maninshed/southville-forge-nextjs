"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full text-offwhite">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div />
        <nav className="hidden space-x-6 md:flex">
          <Link
            href="/about"
            className="hover:text-rust transition-colors duration-200 ease-out will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            About
          </Link>
          <Link
            href="/services"
            className="hover:text-rust transition-colors duration-200 ease-out will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="hover:text-rust transition-colors duration-200 ease-out will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
