


"use client";

import { useFilterPanel } from "@/context/FilterPanelContext";  // Correct hook
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const HamburgerMenu = () => {
  const { isMenuOpen, toggleFilterPanel } = useFilterPanel();  // Using the correct hook
  const pathname = usePathname();
  const router = useRouter();

  // Pages where hamburger should navigate to home instead of toggling
  const homeNavigationPages = ['/submit-pants', '/similar-pants', '/contact'];

  const handleClick = () => {
    if (homeNavigationPages.includes(pathname)) {
      // Navigate to home page
      router.push('/');
    } else {
      // Use existing toggle functionality
      toggleFilterPanel();
    }
  };

  // Only show X icon if we're on a page that uses the toggle functionality
  const shouldShowX = isMenuOpen && !homeNavigationPages.includes(pathname);

  return (
    <button onClick={handleClick} aria-label={homeNavigationPages.includes(pathname) ? "Go to home" : "Toggle menu"} className="relative w-8 h-8 flex items-center justify-center">
      <svg
        className="w-8 h-8 transition-transform duration-300 text-red-800 ease-in-out"
        viewBox="0 0 24 24"
        fill="none"
        stroke={shouldShowX ? "#e53935" : "currentColor"}  // Red when open (only on toggle pages)
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {shouldShowX ? (
          // X Shape (Red when open) - only on pages that use toggle
          <>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </>
        ) : (
          // Hamburger Icon (Default color) - always hamburger on home navigation pages
          <>
            <line x1="3" y1="8" x2="21" y2="8" />
            <line x1="3" y1="16" x2="21" y2="16" />
          </>
        )}
      </svg>
    </button>
  );
};
