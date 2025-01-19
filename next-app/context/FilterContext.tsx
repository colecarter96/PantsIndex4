// context/FilterContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for filters
interface Filters {
  rise: number[];
  thigh: number[];
  legOpening: number[];
}

interface FilterContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Context provider component
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    rise: [5, 20],
    thigh: [5, 20],
    legOpening: [5, 20],
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
