"use client";

import { useEffect, useState } from "react";

const WaitlistPopup = ({ onClose }: { onClose: () => void }) => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
        const res = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Thanks for your submission!");
            setEmail("");
        } else {
            setMessage(data.error || "Something went wrong.");
        }
        } catch (err) {
            setMessage("Error submitting the form.");
        }
    };

  return (
    <div className="font-tex-gyre-heros fixed mr-1 ml-1 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md shadow-lg ">
        <div className="flex justify-end">
            <button
                className="bg-red-800 text-white px-4 py-1 rounded-md text-lg"
                onClick={onClose}
                >
                x
                </button>
        </div> 
      
        <h2 className="text-xl font-bold mb-2">Welcome!</h2>
        <p className="mb-4">
          We are currently still developing! Please enter your email to stay up to date!
        </p>

        <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <button type="submit" className="w-full bg-red-800 text-white py-2 rounded">
                    Submit
                    </button>
                    
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
        
      </div>
      
    </div>
  );
};

export default WaitlistPopup;
