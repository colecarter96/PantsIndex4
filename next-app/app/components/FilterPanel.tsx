// // FilterPanel.tsx
// 'use client';

// import React, { useState } from 'react';
// import RangeSlider from './RangeSlider';
// import { useFilters } from '@/context/FilterContext'; // Adjust the path if needed
// import { useFilterPanel } from '@/context/FilterPanelContext';
// import FilterButton from './FilterButton';

// interface FilterPanelProps {
//   server: boolean;
//   filterRanges: {
//     rise: { min: number; max: number; step: number };
//     thigh: { min: number; max: number; step: number };
//     legOpening: { min: number; max: number; step: number };
//   };
//   isMenuOpen: boolean;
//   toggleMenu: () => void;
// }

// const FilterPanel: React.FC<FilterPanelProps> = ({ server, filterRanges }) => {
//   const { filters, setFilters } = useFilters(); // Access the filter state from context
//   const { isMenuOpen, toggleMenu } = useFilterPanel(); // State for hamburger menu

//   // Function to toggle the menu
//   // const toggleMenu = () => setIsMenuOpen((prev) => !prev);

//   // Handlers for slider changes
//   const handleRiseChange = (values: number[]) => {
//     setFilters((prevFilters) => ({ ...prevFilters, rise: values }));
//   };

//   const handleThighChange = (values: number[]) => {
//     setFilters((prevFilters) => ({ ...prevFilters, thigh: values }));
//   };

//   const handleLegOpeningChange = (values: number[]) => {
//     setFilters((prevFilters) => ({ ...prevFilters, legOpening: values }));
//   };

//   // Reset filters to default
//   const resetFilters = () => {
//     setFilters({
//       rise: [filterRanges.rise.min, filterRanges.rise.max],
//       thigh: [filterRanges.thigh.min, filterRanges.thigh.max],
//       legOpening: [filterRanges.legOpening.min, filterRanges.legOpening.max],
//     });
//   };

//   return (
//     <>
//       { /* add FilterButton */}

//       {/* <FilterButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} /> */}

//       {/* Sliding Filter Panel (mobile/tablet) */}
//       <div
//         className="fixed top-0 right-0 h-full bg-white p-4 transition-transform transform"
//         onClick={toggleMenu} // This will toggle the menu when clicked
//       >
//         <h2 className="text-lg font-bold mb-4">Filters</h2>

        
//         <div className="mb-6">
//           <h3 className="text-sm font-medium">Rise</h3>
//           <RangeSlider
//             min={filterRanges.rise.min}
//             max={filterRanges.rise.max}
//             step={filterRanges.rise.step}
//             values={filters.rise}
//             onChange={handleRiseChange}
//           />
//         </div>

//         <div className="mb-6">
//           <h3 className="text-sm font-medium">Thigh</h3>
//           <RangeSlider
//             min={filterRanges.thigh.min}
//             max={filterRanges.thigh.max}
//             step={filterRanges.thigh.step}
//             values={filters.thigh}
//             onChange={handleThighChange}
//           />
//         </div>

//         <div className="mb-6">
//           <h3 className="text-sm font-medium">Leg Opening</h3>
//           <RangeSlider
//             min={filterRanges.legOpening.min}
//             max={filterRanges.legOpening.max}
//             step={filterRanges.legOpening.step}
//             values={filters.legOpening}
//             onChange={handleLegOpeningChange}
//           />
//         </div>

//         <button
//           className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-full"
//           onClick={resetFilters}
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Static Sidebar for larger screens */}
//       <div className="hidden lg:block md:w-64 p-4 ">
//         <h2 className="text-lg font-bold mb-4">Filters</h2>

        
//         <div className="mb-6">
//           <h3 className="text-sm font-medium">Rise</h3>
//           <RangeSlider
//             min={filterRanges.rise.min}
//             max={filterRanges.rise.max}
//             step={filterRanges.rise.step}
//             values={filters.rise}
//             onChange={handleRiseChange}
//           />
//         </div>

//         <div className="mb-6">
//           <h3 className="text-sm font-medium">Thigh</h3>
//           <RangeSlider
//             min={filterRanges.thigh.min}
//             max={filterRanges.thigh.max}
//             step={filterRanges.thigh.step}
//             values={filters.thigh}
//             onChange={handleThighChange}
//           />
//         </div>

//         <div className="mb-6">
//           <h3 className="text-sm font-medium">Leg Opening</h3>
//           <RangeSlider
//             min={filterRanges.legOpening.min}
//             max={filterRanges.legOpening.max}
//             step={filterRanges.legOpening.step}
//             values={filters.legOpening}
//             onChange={handleLegOpeningChange}
//           />
//         </div>

//         <button
//           className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-full"
//           onClick={resetFilters}
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Overlay when menu is open */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 xl:hidden"
//           onClick={toggleMenu}
//         />
//       )}
//     </>
//   );
// };

// export default FilterPanel;



// FilterPanel.tsx
'use client';

import React, { useEffect, useState , useRef} from 'react';
import RangeSlider from './RangeSlider';
import { useFilters } from '@/context/FilterContext'; // Adjust the path if needed
import { useFilterPanel } from '@/context/FilterPanelContext';
import FilterButton from './FilterButton';

interface FilterPanelProps {
  server: boolean;
  filterRanges: {
    rise: { min: number; max: number; step: number };
    thigh: { min: number; max: number; step: number };
    legOpening: { min: number; max: number; step: number };
  };
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ server, filterRanges }) => {
  const { filters, setFilters } = useFilters(); // Access the filter state from context
  const { isMenuOpen, toggleMenu } = useFilterPanel(); // State for hamburger menu

  // Function to toggle the menu
  // const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  // useEffect(() => {
  //   // Check if it's the first load (not refreshed)
  //   if (sessionStorage.getItem('hasLoaded') === null) {
  //     console.log('Page first load');  // This should log once on the first load

  //     // Set the flag to indicate the page has loaded
  //     sessionStorage.setItem('hasLoaded', 'true');
  //   }
  // }, []); //
  
  // Handlers for slider changes
  const handleRiseChange = (values: number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, rise: values }));
  };

  const handleThighChange = (values: number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, thigh: values }));
  };

  const handleLegOpeningChange = (values: number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, legOpening: values }));
  };

  
  // Reset filters to default
  const resetFilters = () => {
    setFilters({
      rise: [filterRanges.rise.min , filterRanges.rise.max],
      thigh: [filterRanges.thigh.min, filterRanges.thigh.max],
      legOpening: [filterRanges.legOpening.min, filterRanges.legOpening.max],
    });
  };


  

 
  // setFilters({
  //   rise: [filterRanges.rise.min + 1, filterRanges.rise.max - 1],
  //   thigh: [filterRanges.thigh.min + 1, filterRanges.thigh.max - 1],
  //   legOpening: [filterRanges.legOpening.min + 1, filterRanges.legOpening.max - 1],
  // });

  

  // const isInitialized = useRef(false);

  // useEffect(() => {
  //   if (!isInitialized.current && filterRanges && Object.keys(filterRanges).length > 0) {
  //     setFilters({
  //       rise: [filterRanges.rise.min + 1, filterRanges.rise.max - 6],
  //       thigh: [filterRanges.thigh.min + 2, filterRanges.thigh.max - 2],
  //       legOpening: [filterRanges.legOpening.min + 1, filterRanges.legOpening.max - 3],
  //     });

  //     isInitialized.current = true;
  //   }
  // }, [filterRanges, setFilters]); // Only re-run if `filterRanges` changes from undefined to a valid object
    
  

  return (
    <>
      { /* add FilterButton */}

      {/* <FilterButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} /> */}

      {/* Sliding Filter Panel (mobile/tablet) */}
      

      

      {/* Static Sidebar for larger screens */}
      <div className="block p-4 w-full">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        
        <div className="w-4/6 mb-6 flex justify-center lg:w-full mx-auto">
          <div className="w-full">
            <h3 className="ml-2 pb-2 text-base font-medium">Rise</h3>
            <RangeSlider
              min={filterRanges.rise.min}
              max={filterRanges.rise.max}
              step={filterRanges.rise.step}
              values={filters.rise}
              onChange={handleRiseChange}
            />
          </div>
        </div>

        <div className="w-4/6 mb-6 flex justify-center lg:w-full mx-auto">
          <div className="w-full">
            <h3 className="ml-2 pb-2 text-base font-medium">Thigh</h3>
            <RangeSlider
              min={filterRanges.thigh.min}
              max={filterRanges.thigh.max}
              step={filterRanges.thigh.step}
              values={filters.thigh}
              onChange={handleThighChange}
            />
          </div>
        </div>


        <div className="w-4/6 mb-6 flex justify-center lg:w-full mx-auto">
          <div className="w-full">
            <h3 className="ml-2 pb-2 text-base font-medium">Leg Opening</h3>
            <RangeSlider
              min={filterRanges.legOpening.min}
              max={filterRanges.legOpening.max}
              step={filterRanges.legOpening.step}
              values={filters.legOpening}
              onChange={handleLegOpeningChange}
            />
          </div>
        </div>

        <button
          className="bg-gray-200 flex mx-auto justify-center w-5/6 text-black px-4 py-2 rounded hover:bg-gray-300 lg:w-full"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      {/* Overlay when menu is open */}
      {/* {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 xl:hidden"
          onClick={toggleMenu}
        />
      )} */}
    </>
  );
};

export default FilterPanel;