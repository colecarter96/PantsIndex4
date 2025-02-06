// components/HamburgerMenu.tsx
"use client";

import { useFilterPanel } from "@/context/FilterPanelContext";  // Correct hook

export const HamburgerMenu = () => {
  const { isMenuOpen, toggleFilterPanel } = useFilterPanel();  // Using the correct hook

  const textClass = isMenuOpen ? "text-red-600" : "";

  return (
    // <button
    //   onClick={toggleFilterPanel}
    //   aria-label="Open filter menu"
    //   className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    // >
    //   {/* Simple hamburger icon */}
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     strokeWidth={2}
    //     stroke="currentColor"
    //     className="w-6 h-6"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       d="M3 5h18M3 12h18m-9 7h9"
    //     />
    //   </svg>
    // </button>

    <button onClick={toggleFilterPanel} aria-label="Open filter menu">
      <svg className={`w-8 h-8 ${textClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="3" y1="16" x2="21" y2="16" />
      </svg>
    </button>
    
  );
};
