"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const SubmitPantsForm = () => {
  const [form, setForm] = useState({
    Brand: "",
    ModelName: "",
    Type: "",
    ListedSize: "",
    Waist: "",
    Inseam: "",
    Rise: "",
    Thigh: "",
    Knee: "",
    LegOpening: "",
    Price: "",
    Cover: "",
    Hover: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const response = await fetch("/api/submissions/submit-pants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (data.success) {
      setStatus("Submitted for review!");
      setForm({
        Brand: "",
        ModelName: "",
        Type: "",
        ListedSize: "",
        Waist: "",
        Inseam: "",
        Rise: "",
        Thigh: "",
        Knee: "",
        LegOpening: "",
        Price: "",
        Cover: "",
        Hover: "",
      });
    } else {
      setStatus("Error: " + data.error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-5 pt-40">
        <h1 className="text-2xl font-bold mb-4">Submit Pants</h1>
        {status && <p className="text-sm mb-2">{status}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              value={form[key as keyof typeof form]}
              onChange={handleChange}
              placeholder={key}
              className="border p-2 rounded-md"
            />
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SubmitPantsForm;
