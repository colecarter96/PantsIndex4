'use client';

import React, { useState } from 'react';
import FilterPanel from './FilterPanel';
import PantsCard from './PantsCard';

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

interface Filters {
  rise: number[];
  thigh: number[];
  legOpening: number[];
}

interface PantsContentClientProps {
  pants: Pant[];
}

const PantsContentClient: React.FC<PantsContentClientProps> = ({ pants }) => {
  console.log(pants)
  const [filters, setFilters] = useState<Filters>({
    rise: [5, 20],
    thigh: [5, 20],
    legOpening: [5, 20],
  });

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

    console.log(rise, thigh, legOpening); 
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
      <div className="pt-20 w-1/6">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          server={false}
          filterRanges={filterRanges}
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
