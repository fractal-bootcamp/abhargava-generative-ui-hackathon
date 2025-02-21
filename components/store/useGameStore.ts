import { create } from "zustand";

interface Config {
	id: string;
	alias: string;
}

interface GameState {
	configs: Config[];
	currentConfigId: string;
	setConfigId: (configId: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
	configs: [
		{
			id: "b399b61a-bbe0-462c-ac18-711276358a8b",
			alias: "Sultry"
		},
	],
	currentConfigId: "b399b61a-bbe0-462c-ac18-711276358a8b",
	setConfigId: (configId) => set({ currentConfigId: configId }),
}));
