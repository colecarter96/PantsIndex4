"use client";

import { useEffect, useState } from "react";

const Modal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Before You Submit</h2>
        <p className="mb-4">
          Please ensure all measurements and details are accurate (in inches). Submissions will be reviewed before being added.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Modal;
