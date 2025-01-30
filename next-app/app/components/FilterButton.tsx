// FilterButton.tsx
'use client';

import React from 'react';

interface FilterButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button
      className="fixed top-4 right-4 z-20 p-2 bg-gray-800 text-white rounded md:hidden"
      onClick={toggleMenu}
    >
      {isMenuOpen ? 'Close' : 'Filters'}
    </button>
  );
};

export default FilterButton;
