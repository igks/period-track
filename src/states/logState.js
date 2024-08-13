import { create } from "zustand";

export const useLog = create((set) => ({
  table: [],
  setTable: (table) => set({ table }),
  resetUser: () => set({ table: [] }),
}));
