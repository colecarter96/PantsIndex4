// FilterPanel.tsx
'use client';

import React from 'react';
import RangeSlider from './RangeSlider';
import { useFilters } from '@/context/FilterContext';  // Adjust the path if needed

interface FilterPanelProps {
  server: boolean;
  filterRanges: {
    rise: { min: number; max: number; step: number };
    thigh: { min: number; max: number; step: number };
    legOpening: { min: number; max: number; step: number };
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({ server, filterRanges }) => {
  const { filters, setFilters } = useFilters();  // Access the filter state from context

  // Function to handle changes in the rise range
  const handleRiseChange = (values: number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, rise: values }));
  };

  // Function to handle changes in the thigh range
  const handleThighChange = (values: number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, thigh: values }));
  };

  // Function to handle changes in the leg opening range
  const handleLegOpeningChange = (values: number[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, legOpening: values }));
  };

  return (
    <div className="p-4 border-r border-gray-300 w-64">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Rise filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium">Rise</h3>
        <RangeSlider
          min={filterRanges.rise.min}
          max={filterRanges.rise.max}
          step={filterRanges.rise.step}
          values={filters.rise}
          onChange={handleRiseChange}
        />
      </div>

      {/* Thigh filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium">Thigh</h3>
        <RangeSlider
          min={filterRanges.thigh.min}
          max={filterRanges.thigh.max}
          step={filterRanges.thigh.step}
          values={filters.thigh}
          onChange={handleThighChange}
        />
      </div>

      {/* Leg Opening filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium">Leg Opening</h3>
        <RangeSlider
          min={filterRanges.legOpening.min}
          max={filterRanges.legOpening.max}
          step={filterRanges.legOpening.step}
          values={filters.legOpening}
          onChange={handleLegOpeningChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
