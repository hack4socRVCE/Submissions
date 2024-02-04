"use client"
import create from 'zustand';

interface ChipsStore {
  chips: string[];
  addChip: (chip: string) => void;
}

export const useChipsStore = create<ChipsStore>((set) => ({
  chips: [],
  addChip: (chip) => set((state) => ({ chips: [...state.chips, chip] })),
}));