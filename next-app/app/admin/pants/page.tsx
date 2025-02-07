"use client";

import { useState } from "react";

const AdminPants = () => {
  const [form, setForm] = useState({
    ID: "",
    Brand: "",
    "Model Name": "",
    Type: "",
    "Listed Size": "",
    Waist: "",
    Inseam: "",
    Rise: "",
    Thigh: "",
    Knee: "",
    "Leg Opening": "",
    Price: "",
    Cover: "",
    Hover: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/pants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (data.success) {
      alert("Pants added successfully!");
      setForm({
        ID: "",
        Brand: "",
        Model: "",
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
      alert("Error adding pants: " + data.error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Add Pants</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="ID" value={form.ID} onChange={handleChange} placeholder="ID" className="border p-2 rounded-md" />
        <input type="text" name="Brand" value={form.Brand} onChange={handleChange} placeholder="Brand" className="border p-2 rounded-md" />
        <input type="text" name="Model" value={form.Model} onChange={handleChange} placeholder="Model Name" className="border p-2 rounded-md" />
        <input type="text" name="Type" value={form.Type} onChange={handleChange} placeholder="Type" className="border p-2 rounded-md" />
        <input type="text" name="ListedSize" value={form.ListedSize} onChange={handleChange} placeholder="Listed Size" className="border p-2 rounded-md" />
        <input type="text" name="Waist" value={form.Waist} onChange={handleChange} placeholder="Waist" className="border p-2 rounded-md" />
        <input type="text" name="Inseam" value={form.Inseam} onChange={handleChange} placeholder="Inseam" className="border p-2 rounded-md" />
        <input type="text" name="Rise" value={form.Rise} onChange={handleChange} placeholder="Rise" className="border p-2 rounded-md" />
        <input type="text" name="Thigh" value={form.Thigh} onChange={handleChange} placeholder="Thigh" className="border p-2 rounded-md" />
        <input type="text" name="Knee" value={form.Knee} onChange={handleChange} placeholder="Knee" className="border p-2 rounded-md" />
        <input type="text" name="LegOpening" value={form.LegOpening} onChange={handleChange} placeholder="Leg Opening" className="border p-2 rounded-md" />
        <input type="text" name="Price" value={form.Price} onChange={handleChange} placeholder="Price" className="border p-2 rounded-md" />
        <input type="text" name="Cover" value={form.Cover} onChange={handleChange} placeholder="Cover Image URL" className="border p-2 rounded-md" />
        <input type="text" name="Hover" value={form.Hover} onChange={handleChange} placeholder="Hover Image URL" className="border p-2 rounded-md" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default AdminPants;
