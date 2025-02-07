
//Still hydration errors from this page
"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Pants interface
interface Pants {
  _id: string;
  Brand: string;
  ModelName: string;
  Rise: number;
  Thigh: number;
  LegOpening: number;
}

export default function SimilarPantsPage() {
  const [pantsList, setPantsList] = useState<Pants[]>([]);
  const [selectedPantsId, setSelectedPantsId] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState({ Rise: 0, Thigh: 0, LegOpening: 0 });
  const [similarPants, setSimilarPants] = useState<Pants[]>([]);
  const [loading, setLoading] = useState(true);  // Start loading state
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch pants data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pants");
        const data = await response.json();
        setPantsList(data);
        setDataLoaded(true);
      } catch (error) {
        setError("Failed to load pants.");
        setDataLoaded(true); // Even if error occurs, mark as loaded
      }
    };

    fetchData();
  }, []);

  // Prevent hydration error by ensuring the client side state matches initial render
  useEffect(() => {
    if (dataLoaded) {
      setLoading(false);
    }
  }, [dataLoaded]);

  // Sorting pants list
  const sortedPantsList = [...pantsList].sort((a, b) => {
    const brandComparison = a.Brand.localeCompare(b.Brand);
    if (brandComparison !== 0) {
      return brandComparison;
    }
    return a.ModelName.localeCompare(b.ModelName);
  });

  // Calculate distance between pants
  const calculateDistance = (pant1: Pants, pant2: Pants) => {
    return Math.sqrt(
      Math.pow((pant1.Rise - pant2.Rise) * 0.5, 2) +
      Math.pow(pant1.Thigh - pant2.Thigh, 2) +
      Math.pow(pant1.LegOpening - pant2.LegOpening, 2)
    );
  };

  // Find similar pants based on measurements or selected pair
  const findSimilarPants = (basePants: Pants | null) => {
    const base = basePants || measurements;

    const similar = pantsList
      .filter((pants) => pants._id !== selectedPantsId)
      .map((pants) => ({
        ...pants,
        distance: basePants
          ? calculateDistance(pants, basePants)
          : calculateDistance(pants, { ...base, _id: "" } as Pants),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setSimilarPants(similar);
  };

  // Trigger similarity search
  const handleFindSimilar = () => {
    setLoading(true);
    setError(null);

    const useMeasurements = measurements.Rise > 0 || measurements.Thigh > 0 || measurements.LegOpening > 0;
    if (useMeasurements) {
      findSimilarPants(null); // Use measurements if available
    } else if (selectedPantsId) {
      const basePants = pantsList.find((pants) => pants._id === selectedPantsId);
      if (basePants) {
        findSimilarPants(basePants); // Use selected pants data
      }
    } else {
      setError("Please select a pair of pants or enter measurements.");
    }
    setLoading(false);
  };

  // Reset state
  const handleReset = () => {
    setSelectedPantsId(null);
    setMeasurements({ Rise: 0, Thigh: 0, LegOpening: 0 });
    setSimilarPants([]);
  };

  // Ensure proper page rendering only after data is fully loaded
  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <Header />
        <div className="max-w-2xl mx-auto p-6 pt-40">
        <h1 className="text-3xl font-bold mb-4">Find Similar Pants</h1>

        {/* Pants selection dropdown */}
        <label className="block mb-2">Select a pair of pants:</label>
        <select
            className="border p-2 w-full"
            value={selectedPantsId || ""}
            onChange={(e) => setSelectedPantsId(e.target.value || null)}
            disabled={loading}
        >
            <option value="">-- Choose a pair --</option>
            {sortedPantsList.length > 0 && sortedPantsList.map((pants) => (
            <option key={pants._id} value={pants._id}>
                {pants.Brand} {pants.ModelName}
            </option>
            ))}
        </select>

        <div className="my-4 text-center font-bold">OR</div>

        {/* Measurements input fields */}
        <label className="block mb-2">Enter your own measurements:</label>
        <div className="grid grid-cols-3 gap-2">
            <input
            type="number"
            placeholder="Rise"
            className="border p-2 w-full"
            value={isNaN(measurements.Rise) ? "" : measurements.Rise}  // Prevent NaN issues
            onChange={(e) => setMeasurements({ ...measurements, Rise: e.target.value ? parseFloat(e.target.value) : 0 })}
            disabled={loading}
            />
            <input
            type="number"
            placeholder="Thigh"
            className="border p-2 w-full"
            value={isNaN(measurements.Thigh) ? "" : measurements.Thigh}  // Prevent NaN issues
            onChange={(e) => setMeasurements({ ...measurements, Thigh: e.target.value ? parseFloat(e.target.value) : 0 })}
            disabled={loading}
            />
            <input
            type="number"
            placeholder="Leg Opening"
            className="border p-2 w-full"
            value={isNaN(measurements.LegOpening) ? "" : measurements.LegOpening}  // Prevent NaN issues
            onChange={(e) => setMeasurements({ ...measurements, LegOpening: e.target.value ? parseFloat(e.target.value) : 0 })}
            disabled={loading}
            />
        </div>

        <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            onClick={handleFindSimilar}
            disabled={loading}
        >
            {loading ? "Finding..." : "Find Similar Pants"}
        </button>

        <button
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
            onClick={handleReset}
            disabled={loading}
        >
            Reset
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {similarPants.length > 0 && (
            <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Similar Pants:</h2>
            <ul className="space-y-2">
                {similarPants.map((pants) => (
                <li key={pants._id} className="border p-2 rounded">
                    <a href={`/pants/${pants._id}`} className="text-blue-600 hover:underline">
                    {pants.Brand} {pants.ModelName} (Rise: {pants.Rise}, Thigh: {pants.Thigh}, Leg Opening: {pants.LegOpening})
                    </a>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
        <Footer />
    </>
  );
}








// //works!!
// "use client";

// import { useState, useEffect } from "react";

// interface Pants {
//   _id: string;
//   Brand: string;
//   ModelName: string;
//   Rise: number;
//   Thigh: number;
//   LegOpening: number;
// }

// export default function SimilarPantsPage() {
//   const [pantsList, setPantsList] = useState<Pants[]>([]);
//   const [selectedPantsId, setSelectedPantsId] = useState<string | null>(null);
//   const [measurements, setMeasurements] = useState({ Rise: 0, Thigh: 0, LegOpening: 0 });
//   const [similarPants, setSimilarPants] = useState<Pants[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [dataLoaded, setDataLoaded] = useState(false); // Track if data has been fetched

//   // Fetch all pants once when the page loads and store in local state
//   useEffect(() => {
//     fetch("/api/pants")
//       .then((res) => res.json())
//       .then((data) => {
//         setPantsList(data);
//         setDataLoaded(true); // Set the flag to true after data is fetched
//       })
//       .catch(() => {
//         setError("Failed to load pants.");
//         setDataLoaded(true); // Ensure dataLoaded is true even when there's an error
//       });
//   }, []);

//   // Function to calculate the Euclidean distance (for KNN)
//   const calculateDistance = (pant1: Pants, pant2: Pants) => {
//     return Math.sqrt(
//       Math.pow((pant1.Rise - pant2.Rise) * 0.5, 2) +
//       Math.pow(pant1.Thigh - pant2.Thigh, 2) +
//       Math.pow(pant1.LegOpening - pant2.LegOpening, 2)
//     );
//   };

//   // Function to find similar pants based on selected pants or measurements
//   const findSimilarPants = (basePants: Pants | null) => {
//     if (!basePants && !measurements) return;

//     const base = basePants || measurements;

//     const similar = pantsList
//       .filter(pants => pants._id !== selectedPantsId)  // Exclude selected pants from similar pants list
//       .map(pants => ({
//         ...pants,
//         distance: basePants
//           ? calculateDistance(pants, basePants)
//           : calculateDistance(pants, { ...base, _id: "" } as Pants), // Calculate distance based on measurements
//       }))
//       .sort((a, b) => a.distance - b.distance)
//       .slice(0, 5);

//     setSimilarPants(similar);
//   };

//   const handleFindSimilar = () => {
//     setLoading(true);
//     setError(null);

//     // Use measurements if they are not all 0, otherwise fall back to selected pants
//     const useMeasurements = measurements.Rise > 0 || measurements.Thigh > 0 || measurements.LegOpening > 0;
//     if (useMeasurements) {
//       findSimilarPants(null); // Use measurements for similarity calculation
//     } else if (selectedPantsId) {
//       const basePants = pantsList.find(pants => pants._id === selectedPantsId);
//       if (basePants) {
//         findSimilarPants(basePants);
//       }
//     } else {
//       setError("Please select a pair of pants or enter measurements.");
//     }
//     setLoading(false);
//   };

//   const handleReset = () => {
//     setSelectedPantsId(null);
//     setMeasurements({ Rise: 0, Thigh: 0, LegOpening: 0 });
//     setSimilarPants([]);
//   };

//   if (!dataLoaded) {
//     return <div>Loading...</div>; // Show loading state until data is fetched
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Find Similar Pants</h1>

//       <label className="block mb-2">Select a pair of pants:</label>
//       <select
//         className="border p-2 w-full"
//         value={selectedPantsId || ""}
//         onChange={(e) => setSelectedPantsId(e.target.value || null)}
//       >
//         <option value="">-- Choose a pair --</option>
//         {pantsList.map((pants) => (
//           <option key={pants._id} value={pants._id}>
//             {pants.Brand} {pants.ModelName}
//           </option>
//         ))}
//       </select>

//       <div className="my-4 text-center font-bold">OR</div>

//       <label className="block mb-2">Enter your own measurements:</label>
//       <div className="grid grid-cols-3 gap-2">
//         <input
//           type="number"
//           placeholder="Rise"
//           className="border p-2 w-full"
//           value={measurements.Rise}
//           onChange={(e) => setMeasurements({ ...measurements, Rise: parseFloat(e.target.value) })}
//         />
//         <input
//           type="number"
//           placeholder="Thigh"
//           className="border p-2 w-full"
//           value={measurements.Thigh}
//           onChange={(e) => setMeasurements({ ...measurements, Thigh: parseFloat(e.target.value) })}
//         />
//         <input
//           type="number"
//           placeholder="Leg Opening"
//           className="border p-2 w-full"
//           value={measurements.LegOpening}
//           onChange={(e) => setMeasurements({ ...measurements, LegOpening: parseFloat(e.target.value) })}
//         />
//       </div>

//       <button
//         className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
//         onClick={handleFindSimilar}
//         disabled={loading}
//       >
//         {loading ? "Finding..." : "Find Similar Pants"}
//       </button>

//       <button
//         className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
//         onClick={handleReset}
//       >
//         Reset
//       </button>

//       {error && <p className="text-red-600 mt-2">{error}</p>}

//       {similarPants.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Similar Pants:</h2>
//           <ul className="space-y-2">
//             {similarPants.map((pants) => (
//               <li key={pants._id} className="border p-2 rounded">
//                 <a href={`/pants/${pants._id}`} className="text-blue-600 hover:underline">
//                   {pants.Brand} {pants.ModelName} (Rise: {pants.Rise}, Thigh: {pants.Thigh}, Leg Opening: {pants.LegOpening})
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
