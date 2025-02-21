"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { type ComponentRef, useRef } from "react";

export default function ClientComponent({
	accessToken,
}: {
	accessToken: string;
}) {
	const timeout = useRef<number | null>(null);
	const ref = useRef<ComponentRef<typeof Messages> | null>(null);

	return (
		<div className="relative flex flex-col">
			<VoiceProvider
				auth={{ type: "accessToken", value: accessToken }}
				verboseTranscription={false}
				configId="b399b61a-bbe0-462c-ac18-711276358a8b"
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
				<div className="h-14">
					<StartCall />
				</div>
				<div className="flex-1">
					<Messages ref={ref} />
					<Controls />
				</div>
			</VoiceProvider>
		</div>
	);
}
