'use client';

import React, { useState } from 'react';
import FilterPanel from './FilterPanel';
import PantsCard from './PantsCard';
import { useFilters } from '@/context/FilterContext';  // Adjust path if needed

interface Pant {
  _id: string;
  ID: string;
  Brand: string;
  ModelName: string;
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
}

const PantsContentClient: React.FC<{ pants: Pant[] }> = ({ pants }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // State for filter panel visibility
  const { filters } = useFilters();  // Get filters from context

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

    // Check if filters are available and valid
    if (
      !filters.rise || filters.rise.length < 2 ||
      !filters.thigh || filters.thigh.length < 2 ||
      !filters.legOpening || filters.legOpening.length < 2
    ) {
      return true; // Return all pants if filters are invalid or not yet set
    }

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
    <main className="flex">
      <div className=" flex pt-20 w-1/6">
        <FilterPanel
          server={false}
          filterRanges={filterRanges}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>

      <div className="w-5/6 grid gap-6 pt-20 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {filteredPants.length > 0 ? (
          filteredPants.map((pant: Pant) => (
            <PantsCard
              key={pant._id}
              _id={pant._id}
              modelName={pant.ModelName}
              brand={pant.Brand}
              price={pant.Price}
              cover={pant.Cover}
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
