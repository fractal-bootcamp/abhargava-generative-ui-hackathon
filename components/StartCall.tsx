import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Phone, Settings } from "lucide-react";
import { useGameStore } from "@/components/store/useGameStore";
import { ConfigDropdown } from "./ConfigDropdown";

export default function StartCall() {
	const { status, connect } = useVoice();

	return (
		<>
			{status.value !== "connected" ? (
				<div className="flex items-center justify-between gap-2">
					<ConfigDropdown />
					<Button
						className="flex items-center gap-1.5 h-10 px-4"
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
