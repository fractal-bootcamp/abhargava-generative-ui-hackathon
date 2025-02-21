"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { type ComponentRef, useRef } from "react";
import { useGameStore } from "@/components/store/useGameStore";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ClientComponent({
	accessToken,
}: {
	accessToken: string;
}) {
	const timeout = useRef<number | null>(null);
	const ref = useRef<ComponentRef<typeof Messages> | null>(null);
	const configId = useGameStore((state) => state.currentConfigId);
	console.log(configId);

	return (
		<div className="relative flex flex-col max-w-full">
			<VoiceProvider
				auth={{ type: "accessToken", value: accessToken }}
				verboseTranscription={false}
				configId={configId}
				onMessage={() => {
					if (timeout.current) {
						window.clearTimeout(timeout.current);
					}

					timeout.current = window.setTimeout(() => {
						if (ref.current) {
							const scrollHeight = ref.current.scrollHeight;

							ref.current.scrollTo({
								top: scrollHeight,
								behavior: "smooth",
							});
						}
					}, 200);
				}}
			>
				<div className="h-14 flex items-center justify-between px-4 bg-card">
					<StartCall />
				</div>
				<div className="flex-1 max-w-full">
					<Messages ref={ref} />
					<Controls />
				</div>
			</VoiceProvider>
		</div>
	);
}
