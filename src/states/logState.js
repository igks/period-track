import { create } from "zustand";

export const useLog = create((set) => ({
  table: [],
  sortedData: [],
  setTable: (table) => set({ table }),
  setSortedData: (data) => set({ sortedData: data }),
  resetLog: () => set({ table: [], sortedData: [] }),
}));
