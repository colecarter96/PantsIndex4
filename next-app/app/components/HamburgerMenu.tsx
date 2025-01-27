// components/HamburgerMenu.tsx
"use client";

import { useFilterPanel } from "@/context/FilterPanelContext";  // Correct hook

export const HamburgerMenu = () => {
  const { toggleFilterPanel } = useFilterPanel();  // Using the correct hook

  return (
    <button
      onClick={toggleFilterPanel}
      aria-label="Open filter menu"
      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {/* Simple hamburger icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5h18M3 12h18m-9 7h9"
        />
      </svg>
    </button>
  );
};
