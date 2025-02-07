"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type Pants = {
  _id: string;
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
  Hover: string;
};

const AdminReviewForm = () => {
  const [pendingPants, setPendingPants] = useState<Pants[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetch("/api/submissions/get-pending-pants")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPendingPants(data.pants);
        } else {
          setStatus("Error fetching data");
        }
      })
      .catch(() => setStatus("Failed to load data"));
  }, []);

  const handleChange = (id: string, field: keyof Pants, value: string) => {
    setPendingPants((prev) =>
      prev.map((pants) =>
        pants._id === id ? { ...pants, [field]: value } : pants
      )
    );
  };

  const submitEditedPants = async (pants: Pants) => {
    const { _id, ...updatedPants } = pants;

    const response = await fetch("/api/submissions/submit-edited-pants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: _id, updatedPants }),
    });

    const data = await response.json();
    if (data.success) {
      setPendingPants((prev) => prev.filter((p) => p._id !== pants._id));
    } else {
      setStatus("Failed to submit pants");
    }   
  };

  const deletePants = async (id: string) => {
    const response = await fetch("/api/submissions/delete-pending-pants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  
    const data = await response.json();
    if (data.success) {
      setPendingPants((prev) => prev.filter((p) => p._id !== id));
    } else {
      setStatus("Failed to delete pants");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-5 pt-10">
            <h1 className="text-2xl font-bold mb-4">Admin Review - Edit & Submit</h1>
            {status && <p className="text-red-500">{status}</p>}
            {pendingPants.length === 0 ? (
              <p>No pending submissions.</p>
            ) : (
              <div className="space-y-6">
                {pendingPants.map((pants) => (
                  <div key={pants._id} className="border p-4 rounded-md shadow">
                    <h2 className="text-lg font-bold">Edit Pants Entry</h2>
                    <div className="grid gap-2">
                      {Object.keys(pants).map((key) =>
                        key !== "_id" ? (
                          <input
                            key={key}
                            type="text"
                            name={key}
                            value={pants[key as keyof Pants]}
                            onChange={(e) => handleChange(pants._id, key as keyof Pants, e.target.value)}
                            placeholder={key}
                            className="border p-2 rounded-md w-full"
                          />
                        ) : null
                      )}
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-2 mt-2 rounded-md w-full"
                      onClick={() => submitEditedPants(pants)}
                    >
                      Submit to Database
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-2 mt-2 rounded-md w-full"
                      onClick={() => deletePants(pants._id)}
                      >
                      Delete
                      </button>
                  </div>
                  
                ))}
              </div>
            )}
          </div>
          <Footer />
    </>
    
  );
};

export default AdminReviewForm;
