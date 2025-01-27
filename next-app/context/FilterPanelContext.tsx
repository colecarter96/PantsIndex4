'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface FilterPanelContextType {
  isMenuOpen: boolean;
  toggleFilterPanel:() => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

// Create the context
const FilterPanelContext = createContext<FilterPanelContextType | undefined>(undefined);

// Provider Component
export const FilterPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFilterPanel = () => {
    setIsMenuOpen(prev => !prev);
  };

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <FilterPanelContext.Provider value={{ isMenuOpen, toggleFilterPanel, openMenu, closeMenu, toggleMenu }}>
      {children}
    </FilterPanelContext.Provider>
  );
};

// Custom Hook to use the context
export const useFilterPanel = () => {
  const context = useContext(FilterPanelContext);
  if (!context) {
    throw new Error("useFilterPanel must be used within a FilterPanelProvider");
  }
  return context;
};
