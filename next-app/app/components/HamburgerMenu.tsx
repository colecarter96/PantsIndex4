// // components/HamburgerMenu.tsx
// "use client";

// import { useFilterPanel } from "@/context/FilterPanelContext";  // Correct hook

// export const HamburgerMenu = () => {
//   const { isMenuOpen, toggleFilterPanel } = useFilterPanel();  // Using the correct hook

//   const textClass = isMenuOpen ? "text-red-600" : "";

//   return (
    

//     <button onClick={toggleFilterPanel} aria-label="Open filter menu">
//       <svg className={`w-8 h-8 ${textClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//         <line x1="3" y1="8" x2="21" y2="8" />
//     <line x1="3" y1="16" x2="21" y2="16" />
//       </svg>
//     </button>
    
//   );
// };


"use client";

import { useFilterPanel } from "@/context/FilterPanelContext";  // Correct hook

export const HamburgerMenu = () => {
  const { isMenuOpen, toggleFilterPanel } = useFilterPanel();  // Using the correct hook

  return (
    <button onClick={toggleFilterPanel} aria-label="Toggle menu" className="relative w-8 h-8 flex items-center justify-center">
      <svg
        className="w-8 h-8 transition-transform duration-300 ease-in-out"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isMenuOpen ? "#e53935" : "currentColor"}  // Red when open
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {isMenuOpen ? (
          // X Shape (Red when open)
          <>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </>
        ) : (
          // Hamburger Icon (Default color)
          <>
            <line x1="3" y1="8" x2="21" y2="8" />
            <line x1="3" y1="16" x2="21" y2="16" />
          </>
        )}
      </svg>
    </button>
  );
};
