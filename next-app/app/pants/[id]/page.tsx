import { notFound } from 'next/navigation';

interface Pant {
  _id: string;
  ID: string;
  Brand: string;
  ModelName: string;
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
}

// Fetch Pant details by id
const fetchPant = async (id: string): Promise<Pant | null> => {
  const res = await fetch(`http://localhost:3000/api/pants/${id}`, {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!res.ok) {
    throw new Error("Pant not found");
  }

  return res.json();
};

interface PantsDetailPageProps {
  params: { id: string };
}

const PantDetailPage = async ({ params }: PantsDetailPageProps) => {
  const { id } = await params;

  // Fetch the pant details
  const pant = await fetchPant(id);

  // If no pant is found, show a 404 error page
  if (!pant) {
    notFound();
  }

  return (
    <div className="pantDetailPage">
      <div className="pantImage">
        <img
          src={pant.Cover || "/placeholder.png"}
          alt={`${pant.ModelName} cover`}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="pantDetails">
        <h1>{pant.ModelName}</h1>
        <h2>{pant.Brand}</h2>
        <p>Price: {pant.Price}</p>
        <p>Waist: {pant.Waist}</p>
        <p>Inseam: {pant.Inseam}</p>
        <p>Rise: {pant.Rise}</p>
        <p>Thigh: {pant.Thigh}</p>
        <p>Knee: {pant.Knee}</p>
        <p>Leg Opening: {pant["Leg Opening"]}</p>
      </div>
    </div>
  );
};

export default PantDetailPage;
