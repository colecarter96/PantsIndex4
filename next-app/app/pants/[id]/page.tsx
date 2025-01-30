// import { notFound } from 'next/navigation';

// interface Pant {
//   _id: string;
//   ID: string;
//   Brand: string;
//   ModelName: string;
//   Type: string;
//   ListedSize: string;
//   Waist: string;
//   Inseam: string;
//   Rise: string;
//   Thigh: string;
//   Knee: string;
//   "Leg Opening": string;
//   Price: string;
//   Cover: string;
// }

// // Fetch Pant details by id
// const fetchPant = async (id: string): Promise<Pant | null> => {
//   const res = await fetch(`http://localhost:3000/api/pants/${id}`, {
//     cache: "no-store", // Ensures fresh data on every request
//   });

//   if (!res.ok) {
//     throw new Error("Pant not found");
//   }

//   return res.json();
// };

// interface PantsDetailPageProps {
//   params: { id: string };
// }

// const PantDetailPage = async ({ params }: PantsDetailPageProps) => {
//   const { id } = await params;

//   // Fetch the pant details
//   const pant = await fetchPant(id);

//   // If no pant is found, show a 404 error page
//   if (!pant) {
//     notFound();
//   }

//   return (
//     <div className="pantDetailPage">
//       <div className="pantImage">
//         <img
//           src={pant.Cover || "/placeholder.png"}
//           alt={`${pant.ModelName} cover`}
//           className="w-full h-auto object-contain"
//         />
//       </div>
//       <div className="pantDetails">
//         <h1>{pant.ModelName}</h1>
//         <h2>{pant.Brand}</h2>
//         <p>Price: {pant.Price}</p>
//         <p>Waist: {pant.Waist}</p>
//         <p>Inseam: {pant.Inseam}</p>
//         <p>Rise: {pant.Rise}</p>
//         <p>Thigh: {pant.Thigh}</p>
//         <p>Knee: {pant.Knee}</p>
//         <p>Leg Opening: {pant["Leg Opening"]}</p>
//       </div>
//     </div>
//   );
// };

// export default PantDetailPage;


"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Corrected to use next/navigation for dynamic routing
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Pant {
  _id: string;
  ID: string;
  Brand: string;
  "Model Name": string;
  Type: string;
  ListedSize: string;
  Waist: string;
  Inseam: string;
  Rise: string;
  Thigh: string;
  Knee: string;
  "Leg Opening": string;
  Price: string;
  Cover: string;
  Hover: string;
}

const API_URL = process.env.PRODUCTION_API;

const PantsDetailsPage = () => {
  const { id } = useParams(); // Retrieve the dynamic ID from the route
  const [pants, setPants] = useState<Pant | null>(null); // Fixed type to `Pant`
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPantsData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pants/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch pants data");
        }

        const data = await res.json();
        setPants(data);
      } catch (error) {
        console.error(error);
        setError("Pants not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPantsData(); // Fetch data only if `id` is available
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!pants) return <div>Pants not found</div>; // Handling case where pants data is not available

  return (
    <>
    <Header />
      <div className="flex flex-col items-center justify-center w-full pt-20 lg:w-3/4 mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full bg-gray-50 shadow-md rounded-lg p-8">
          {/* Left Section: Photo Carousel */}
          <PhotoCarousel images={[pants.Cover, pants.Hover]} modelName={pants["Model Name"]} />

          {/* Right Section: Pants Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{pants["Model Name"]}</h1>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Brand:</strong> {pants.Brand}
            </p>
            <p className="text-gray-900 text-lg mb-2">
              <strong>Price:</strong> {pants.Price}
            </p>
            <p className="text-gray-600 text-lg mb-4">No additional details available.</p> {/* Static example, update if needed */}
            <h2 className="text-2xl font-semibold mb-2">Measurements</h2>
            <ul className="text-gray-700 text-lg space-y-2">
              <li><strong>Waist:</strong> {pants.Waist}</li>
              <li><strong>Inseam:</strong> {pants.Inseam}</li>
              <li><strong>Rise:</strong> {pants.Rise}</li>
              <li><strong>Thigh:</strong> {pants.Thigh}</li>
              <li><strong>Knee:</strong> {pants.Knee}</li>
              <li><strong>Leg Opening:</strong> {pants["Leg Opening"]}</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />  
    </>
    
  );
};

const PhotoCarousel = ({ images, modelName }: { images: string[]; modelName: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex justify-center items-center w-full lg:w-1/2 aspect-[3/4] bg-gray-100 rounded-md overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        ←
      </button>

      {/* Image */}
      <img
        src={images[currentImageIndex]}
        alt={`${modelName} image ${currentImageIndex + 1}`}
        className="object-contain w-full h-full"
      />

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        →
      </button>
    </div>
  );
};

export default PantsDetailsPage;
