// PantsContent.server.tsx
import React from 'react';
import PantsContentClient from './PantsContentClient';

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

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PRODUCTION_API;

async function getPants() {
  const response = await fetch(`${API_URL}/api/pants`, { cache: "no-store" }); // Prevent caching
  if (!response.ok) throw new Error("Failed to fetch pants data");
  return response.json();
}

const PantsContentServer: React.FC = async () => {
  const pants = await getPants(); // Fetch data on the server

  return <PantsContentClient pants={pants} />;
  
};

export default PantsContentServer;
