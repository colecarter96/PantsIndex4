import React from 'react';
import PantsCard from './PantsCard';

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
    LegOpening: string;
    Price: string;
    Cover: string;
}
  
  
async function getPants(): Promise<Pant[]> {
    try {
      const response = await fetch('http://localhost:3000/api');
      if (!response.ok) {
        throw new Error('Failed to fetch pants data');
      }
      return response.json(); // This resolves to a Promise<Pant[]>
    } catch (error) {
      console.error('Error fetching pants:', error);
      return []; // Return an empty array on failure
    }
  }

const PantsContent = async () => {
    const pants = await getPants();
    console.log(pants)
    return (
        <main className="flex">
            <div className="pt-20 w-1/6">
                <h2>Filter</h2>

                <h3>Rise</h3>

                <h3>Thigh</h3>

                <h3>Leg Opening</h3>
            </div>

            <div className="w-5/6 grid gap-6 pt-20 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {pants.map((pant: Pant) => (
                    <PantsCard
                        key={pant._id}
                        _id={pant._id}
                        modelName={pant.ModelName}
                        brand={pant.Brand}
                        price={pant.Price}
                        cover={pant.Cover}
                    />
                ))}
            </div>
        </main>
        
    )
}

export default PantsContent
