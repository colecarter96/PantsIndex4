// PantsContentClient.tsx
'use client';

import React, { useState } from 'react';
import FilterPanel from './FilterPanel';
import PantsCard from './PantsCard';
import { useFilters } from '@/context/FilterContext';  // Adjust path if needed
import { useFilterPanel } from '@/context/FilterPanelContext';

interface Pant {
  _id: string;
  ID: string;
  Brand: string;
  "Model Name": string;
  Type: string;
  ListedSize: string;
  Waist: string;  // Waist is also a string here
  Inseam: string; // Inseam is also a string here
  Rise: string;   // Rise is a string
  Thigh: string;  // Thigh is a string
  Knee: string;
  "Leg Opening": string;  // Allow property with space
  Price: string;
  Cover: string;
  Hover: string;
}

const PantsContentClient: React.FC<{ pants: Pant[] }> = ({ pants }) => {
  const { isMenuOpen, toggleMenu } = useFilterPanel(); // State for hamburger menu
  const { filters } = useFilters();  // Get filters from context


  const filterRanges = {
    rise: { min: 5, max: 20, step: 0.1 },
    thigh: { min: 5, max: 20, step: 0.1 },
    legOpening: { min: 5, max: 20, step: 0.1 },
  };

  const filteredPants = pants.filter((pant) => {
    // Ensure values are treated as numbers for comparison
    const rise = parseFloat(pant.Rise); // Convert Rise to a number
    const thigh = parseFloat(pant.Thigh); // Convert Thigh to a number
    const legOpening = parseFloat(pant["Leg Opening"]); // Convert LegOpening to a number

    return (
      rise >= filters.rise[0] &&
      rise <= filters.rise[1] &&
      thigh >= filters.thigh[0] &&
      thigh <= filters.thigh[1] &&
      legOpening >= filters.legOpening[0] &&
      legOpening <= filters.legOpening[1]
    );
  });

  return (
    <main className="lg:flex  md:flex sm:flex xs:flex">
      {/* <div className=" flex pt-20 w-1/6 lg:w-1/6 md:w-0 sm:w-0 "> */}
      <div className="pt-44 ml-3 hidden lg:flex lg:w-1/6">
      {/* <div className='hidden'> */}
        <FilterPanel
          server={false}
          filterRanges={filterRanges}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>
      <div
        className={`pt-28 center lg:hidden fixed top-0 right-0 w-5/6 h-full bg-white p-4 z-30 transition-transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <FilterPanel
          server={false}
          filterRanges={filterRanges}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>

      {/* <div className="w-5/6 grid gap-6 pt-24 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"> */}
      <div className="grid pt-36 gap-0 gap-y-3 w-full grid-cols-2 xl:grid-cols-3 lg:w-5/6 lg:gap-6 lg:grid-cols-2 md:w-full md:grid-cols-2 md:gap-5 sm:w-full sm:grid-cols-2 sm:gap-0">
        {filteredPants.length > 0 ? ( 
          filteredPants.map((pant: Pant) => (
            <PantsCard 
              key={pant._id}
              _id={pant._id}
              modelName={pant["Model Name"]}
              brand={pant.Brand}
              price={pant.Price}
              cover={pant.Cover}
              hover={pant.Hover}
            />
          ))
        ) : (
          <p>No pants match the selected filters.</p>
        )}
      </div>
    </main>
  );
};

export default PantsContentClient;
