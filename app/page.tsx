import { Nav } from "@/components/Nav";

// const Chat = dynamic(() => import("@/components/Chat"), {
// 	ssr: false,
// });

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
					Webcam and face detection will appear here
				</div>
			</div>
		</div>
	);
}
