import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavItem[];
  className?: string;
  currentPath?: string;
}

export const Navbar = ({
  items = [
    { label: "Home", href: "/" },
    { label: "Cape", href: "/cape" },
    { label: "HDR", href: "/hdr" },
    { label: "Uses", href: "/uses" },
    { label: "Pics", href: "/pics" },
  ],
  className,
  currentPath = "",
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={twMerge(
        "sticky top-0 z-50 bg-[#20262D]/95 backdrop-blur-sm border-b border-gray-700",
        className,
      )}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-white font-bold text-xl hover:text-blue-400 transition-colors"
            >
              Sean Boult
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-item px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
                  currentPath === item.href
                    ? "text-white border-blue-400"
                    : "text-gray-300 border-transparent hover:text-white hover:border-gray-500"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>{isMenuOpen ? "Close menu" : "Open menu"}</title>
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-item block px-3 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                    currentPath === item.href
                      ? "text-white border-blue-400"
                      : "text-gray-300 border-transparent hover:text-white hover:border-gray-500"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
