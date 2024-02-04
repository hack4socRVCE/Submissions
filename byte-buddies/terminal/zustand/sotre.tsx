import { create } from "zustand";

export const usePersonStore = create((set) => ({
	Name: "",
	role: "",
	updatetName: (Name) => set(() => ({ Name: Name })),
	updatetRole: (role) => set(() => ({ role: role })),
}));
