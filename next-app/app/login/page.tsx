"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check password (set in environment variables for security)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      document.cookie = `auth-token=${password}; path=/; max-age=86400`; // Store token for 1 day
      router.push("/admin/pants");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter Admin Password"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-2">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LoginPage;
