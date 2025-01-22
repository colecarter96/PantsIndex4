'use client';
import { useFilters } from '@/context/FilterContext'; // Import the custom hook
import FilterButton from './FilterButton';

const Header: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useFilters(); // Access the menu state and toggle function

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      {/* Other header content */}
      <h1 className="text-xl font-bold">Pants Store</h1>

      {/* Pass down the state and toggle function to FilterButton */}
      <FilterButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;