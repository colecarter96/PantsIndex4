"use client"

import React, { useState } from 'react';

interface HeroProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  onSearch?: (value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ 
  imageUrl = "https://lp-cms-production.imgix.net/2024-04/LPT0115-001.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop", 
  title = "Measurements First Pants Browsing", 
  subtitle = "Join the community!",
  placeholder = "Type your email...",
  buttonText = "Join",
  onSearch 
}) => {
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
        setMessage("Thanks for joining!");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error submitting the form.");
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '50vh', marginTop: 'calc(2.5rem + 2rem)' }}>
      {/* Background Image */}
      {/* <img 
        src={imageUrl} 
        alt="Hero background" 
        className="w-full h-full object-cover"
      /> */}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-red-800 bg-opacity-100"></div>
      
      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Title */}
        {title && (
          <h1 className="font-comico text-4xl md:text-5xl mx-0 lg:mx-32 lg:text-6xl text-white text-center mb-4 drop-shadow-lg">
            {title}
          </h1>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-white text-center mb-8 max-w-2xl drop-shadow-lg">
            {subtitle}
          </p>
        )}
        
        {/* Email Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              name="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-sm text-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-500 transition-colors"
            >
              {buttonText}
            </button>
          </div>
          {message && (
            <p className="mt-4 text-center text-white font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Hero;
  