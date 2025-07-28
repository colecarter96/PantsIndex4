// PantsContentClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import FilterPanel from './FilterPanel';
import PantsCard from './PantsCard';
import { useFilters } from '@/context/FilterContext';  // Adjust path if needed
import { useFilterPanel } from '@/context/FilterPanelContext';
// import WaitlistPopup from './WaitlistPopup';

interface Pant {
  _id: string;
  Brand: string;
  ModelName: string;
  Type: string;
  ListedSize: string;
  Waist: string;  // Waist is also a string here
  Inseam: string; // Inseam is also a string here
  Rise: string;   // Rise is a string
  Thigh: string;  // Thigh is a string
  Knee: string;
  LegOpening: string;  // Allow property with space
  Price: string;
  Cover: string;
  Hover: string;
}

interface PantsContentClientProps {
  pants: Pant[];
}

const PantsContentClient: React.FC<PantsContentClientProps> = ({ pants = [] }) => {
  const [isClient, setIsClient] = useState(false);
  const { isMenuOpen, toggleMenu } = useFilterPanel();
  const { filters } = useFilters();
  // const [showWaitlistPopup, setShowWaitlistPopup] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // getting value of "seenPopUp" key from localStorage
    let returningUser = localStorage.getItem("seenPopUp");
    // if it's not there, for a new user, it will be null
    // if it's there it will be boolean true
    // setting the opposite to state, false for returning user, true for a new user
    console.log("HELLO DOWN THERE");
    // setShowWaitlistPopup(returningUser != "true");
  }, []);

  const filterRanges = { rise: { min: 5, max: 20, step: 0.1 }, thigh: { min: 5, max: 20, step: 0.1 }, legOpening: { min: 5, max: 20, step: 0.1 } };

  const filteredPants = pants.filter((pant) => {
    if (!filters.rise || !filters.thigh || !filters.legOpening) return true;

    const rise = parseFloat(pant.Rise) || 0;
    const thigh = parseFloat(pant.Thigh) || 0;
    const legOpening = parseFloat(pant.LegOpening) || 0;

    return (
      rise >= filters.rise[0] && rise <= filters.rise[1] &&
      thigh >= filters.thigh[0] && thigh <= filters.thigh[1] &&
      legOpening >= filters.legOpening[0] && legOpening <= filters.legOpening[1]
    );
  });

  // const closeWaitlistPopup = () => {
  //   // setting key "seenPopUp" with value true into localStorage
  //   localStorage.setItem("seenPopUp", "true");
  //   // setting state to false to not display pop-up
  //   setShowWaitlistPopup(false);
  // };

  if (!isClient) return null; // Prevents hydration mismatches

  return (
    <main className="lg:flex  md:flex sm:flex xs:flex">
      {/* <div className=" flex pt-20 w-1/6 lg:w-1/6 md:w-0 sm:w-0 "> */}
      {/* {showWaitlistPopup && <WaitlistPopup onClose={closeWaitlistPopup} />} */}
      {/* {showWaitlistPopup && <WaitlistPopup onClose={() => setShowWaitlistPopup(false)} />} */}
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
        className={`pt-28 center lg:hidden fixed top-0 right-0 w-full h-full bg-white p-4 z-30 transition-transform ${
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
      <div className="grid pt-12 md:pt-36 gap-0 gap-y-3 w-full grid-cols-2 xl:grid-cols-3 lg:w-5/6 lg:gap-6 lg:grid-cols-2 md:w-full md:grid-cols-2 md:gap-5 sm:w-full sm:grid-cols-2 sm:gap-0">
        {filteredPants.length > 0 ? ( 
          filteredPants.map((pant: Pant) => (
            <PantsCard 
              key={pant._id}
              _id={pant._id}
              modelName={pant.ModelName}
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
