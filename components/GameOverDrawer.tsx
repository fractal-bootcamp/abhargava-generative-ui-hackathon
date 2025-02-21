"use client";

import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useGameStore } from "./store/useGameStore";

export function GameOverDrawer() {
	const { smileCount, isGameOver, resetGame } = useGameStore();

	return (
		<Drawer open={isGameOver} onOpenChange={(open) => !open && resetGame()}>
			<div className="p-4 text-center">
				<h2 className="text-2xl font-bold mb-4">Game Over!</h2>
				<p className="mb-4">You smiled too much! ({smileCount} times)</p>
				<Button onClick={resetGame}>Try Again</Button>
			</div>
		</Drawer>
	);
}
