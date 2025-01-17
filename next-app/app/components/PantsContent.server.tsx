// PantsContent.server.tsx
import React from 'react';
import PantsContentClient from './PantsContentClient';

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

async function getPants(): Promise<Pant[]> {
  const response = await fetch('http://localhost:3000/api');
  if (!response.ok) {
    throw new Error('Failed to fetch pants data');
  }
  
  return response.json();
}

const PantsContentServer: React.FC = async () => {
  const pants = await getPants(); // Fetch data on the server

  return <PantsContentClient pants={pants} />;
};

export default PantsContentServer;
