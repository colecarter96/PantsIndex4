"use client";

import { useEffect, useState } from "react";

const Modal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="font-tex-gyre-heros fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Before You Submit</h2>
        <p className="mb-4">
          Please ensure all measurements and details are accurate (in inches). If you can&apos;t find a measurement, please put -1. 
        </p>

        <p className="mb-4">
        Submissions will be reviewed before being added.
        </p>
        <button
          className="bg-red-800 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Modal;
