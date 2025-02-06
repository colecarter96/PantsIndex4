import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Pant {
  _id: string;
  ID: string;
  Brand: string;
  "Model Name": string;
  Type: string;
  ListedSize: string;
  Waist: string;
  Inseam: string;
  Rise: string;
  Thigh: string;
  Knee: string;
  "Leg Opening": string;
  Price: string;
  Cover: string;
  Hover: string;
}

interface PantsStore {
  pants: Pant[];
  setPants: (pants: Pant[]) => void;
}

export const usePantsStore = create<PantsStore>()(
  persist(
    (set) => ({
      pants: [],
      setPants: (pants) => set({ pants }),
    }),
    {
      name: "pants-storage", // 🔥 Stores data in localStorage
    }
  )
);
