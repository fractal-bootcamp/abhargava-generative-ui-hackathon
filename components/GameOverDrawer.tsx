"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useGameStore } from "./store/useGameStore";

export function GameOverDrawer() {
	const { smileCount, isGameOver, resetGame } = useGameStore();

	return (
		<Drawer open={isGameOver} onOpenChange={(open) => !open && resetGame()}>
			<DrawerContent className="max-h-[75vh] bg-black">
				<div className="p-4 text-center flex flex-col items-center justify-center min-h-[50vh]">
					<h2
						className="text-6xl font-bold mb-8 text-red-600 animate-pulse uppercase tracking-wider"
						style={{
							textShadow:
								"2px 2px 8px rgba(255, 0, 0, 0.6), -2px -2px 8px rgba(255, 0, 0, 0.6)",
							fontFamily: "'Impact', sans-serif",
						}}
					>
						💀
					</h2>
					<p
						className="mb-8 text-2xl text-yellow-500"
						style={{
							textShadow: "1px 1px 4px rgba(255, 215, 0, 0.6)",
							fontFamily: "'Impact', sans-serif",
						}}
					>
						You smiled {smileCount} times
					</p>
					<Button
						onClick={resetGame}
						className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl uppercase tracking-wider transition-all duration-300 hover:scale-105"
						style={{
							textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
							boxShadow: "0 0 20px rgba(255, 0, 0, 0.4)",
						}}
					>
						Go Again!
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
