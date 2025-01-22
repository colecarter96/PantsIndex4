'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the types for your context
interface FilterContextType {
  filters: any; // Replace with the actual type of your filters
  setFilters: React.Dispatch<React.SetStateAction<any>>; // Function to set filters
  isMenuOpen: boolean; // The state for the sliding menu
  toggleMenu: () => void; // Function to toggle the menu
}

// Create context with default value
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Create the FilterProvider component
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<any>({}); // Initialize your filters state here
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize the menu state

  // Function to toggle the menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <FilterContext.Provider value={{ filters, setFilters, isMenuOpen, toggleMenu }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the FilterContext
export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
