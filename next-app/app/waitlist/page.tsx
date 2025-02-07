"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, suggestion }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Thanks for your submission!");
        setEmail("");
        setSuggestion("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error submitting the form.");
    }
  };

  return (
    <>
        <Header />
        <div className="pt-32">
            <div className="max-w-md mx-auto mt-10 mb-5 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Stay Up To Date</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <textarea
                    placeholder="Any suggestions?"
                    className="w-full p-2 mb-3 border rounded"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Submit
                    </button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
            </div>
        </div>
        
        <Footer />

    </>
    
  );
}
