"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminPants from "./pants/page";
import AdminReviewForm from "../components/AdminReviewForm";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"submit" | "review">("submit");

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto p-5 pt-40">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-white">
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("submit")}
          className={`p-2 rounded-md ${activeTab === "submit" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Submit Pants
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`p-2 rounded-md ${activeTab === "review" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Review Submissions
        </button>
      </div>

      {/* Render Tab Content */}
      {activeTab === "submit" ? <AdminPants /> : <AdminReviewForm />}
    </div>
  );
};

export default AdminDashboard;
