import { create } from "zustand";

interface GameState {
	configId: string;
	setConfigId: (configId: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
	configId: "b399b61a-bbe0-462c-ac18-711276358a8b",
	setConfigId: (configId) => set({ configId }),
}));
