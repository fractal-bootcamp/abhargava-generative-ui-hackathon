import { create } from "zustand";

interface Config {
	id: string;
	alias: string;
}

interface GameState {
	configs: Config[];
	currentConfigId: string;
	smileCount: number;
	isGameOver: boolean;
	setConfigId: (configId: string) => void;
	incrementSmile: () => void;
	resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
	configs: [
		{
			id: "b399b61a-bbe0-462c-ac18-711276358a8b",
			alias: "Sultry"
		},
	],
	currentConfigId: "b399b61a-bbe0-462c-ac18-711276358a8b",
	smileCount: 0,
	isGameOver: false,
	setConfigId: (configId) => set({ currentConfigId: configId }),
	incrementSmile: () => set((state) => ({
		smileCount: state.smileCount + 1,
		isGameOver: state.smileCount + 1 >= 100
	})),
	resetGame: () => set({ smileCount: 0, isGameOver: false }),
}));
