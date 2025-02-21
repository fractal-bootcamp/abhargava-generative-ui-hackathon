import { Nav } from "@/components/Nav";
import { VideoCamera } from "@/components/VideoCamera";
import { GameOverDrawer } from "@/components/GameOverDrawer";

export default async function Page() {
	return (
		<div className="grow flex">
			{/* Left half */}
			<div className="w-1/2 relative flex flex-col">
				<Nav />
				<div className="grow flex flex-col" />
			</div>
			{/* Right half */}
			<div className="w-1/2 border-l border-border flex items-center justify-center">
				<div className="p-4 bg-card border border-border rounded-lg">
					<VideoCamera />
				</div>
			</div>
			<GameOverDrawer />
		</div>
	);
}
