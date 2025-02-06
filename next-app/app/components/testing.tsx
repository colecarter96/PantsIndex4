"use client";

import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    console.log("WHAT THE FUCK BRO!");
  }, []);

  return <div>Test Page</div>;
}
