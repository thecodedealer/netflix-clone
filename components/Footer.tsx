import { Languages } from "lucide-react";
import Link from "next/link";
import React from "react";

const links = [
  ["FAQ", "Help Centre", "Account", "Media Centre"],
  ["Investor Relations", "Jobs", "Ways to Watch", "Terms of Use"],
  ["Privacy", "Cookie Preferences", "Corporate Information", "Contact Us"],
  ["Speed Test", "Legal Notices", "Only on Netflix"],
];

function Footer() {
  return (
    <footer className="mt-48 bg-[#141414] border-t border-white/5 px-8 py-12 text-white/40">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm mb-6">
          Questions? Call{" "}
          <Link
            href="tel:1-844-505-2993"
            className="underline hover:text-white/60 transition-colors"
          >
            1-844-505-2993
          </Link>
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 mb-8">
          {links.flat().map((label) => (
            <li key={label}>
              <Link
                href="#"
                className="text-xs hover:text-white/60 transition-colors underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 mb-6">
          <button className="flex items-center gap-2 text-xs border border-white/25 px-3 py-1.5 hover:border-white/40 transition-colors">
            <Languages size={16} />
            English
          </button>
        </div>

        <p className="text-xs">
          Netflix Clone &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
