"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactForm() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
  
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setStatus(null);
  
      try {
        const response = await fetch("/api/submissions/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setStatus({ type: "success", message: "Message sent successfully!" });
          setFormData({ name: "", email: "", message: "" }); // Clear form
        } else {
          setStatus({ type: "error", message: result.error || "Failed to send message." });
        }
      } catch (error) {
        setStatus({ type: "error", message: "Network error. Please try again." });
      }
  
      setLoading(false);
    };

  return (
    <>
        <Header />
        <div className="pt-32 pb-2">

        
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            {status && (
                <p className={`mb-2 ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {status.message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white"}`}
                >
                {loading ? "Sending..." : "Send"}
                </button>
            </form>
            </div>
        </div>
        <Footer />
    </>
    
  );
}
