import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export default function StartCall() {
	const { status, connect } = useVoice();

	return (
		<>
			{status.value !== "connected" ? (
				<div className="flex items-center justify-start">
					<Button
						className="z-50 flex items-center gap-1.5"
						onClick={() => {
							connect()
								.then(() => {})
								.catch(() => {})
								.finally(() => {});
						}}
					>
						<span>
							<Phone
								className="size-4 opacity-50"
								strokeWidth={2}
								stroke="currentColor"
							/>
						</span>
						<span>Start</span>
					</Button>
				</div>
			) : null}
		</>
	);
}
