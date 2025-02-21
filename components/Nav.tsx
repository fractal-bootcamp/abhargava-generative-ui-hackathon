"use client";
import { useGameStore } from "@/components/store/useGameStore";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
	ssr: false,
});

// Client component
export const Nav = ({ accessToken }: { accessToken: string }) => {
	const { configId, setConfigId } = useGameStore();

	return (
		<div className="px-4 py-2 h-14 z-50 bg-card border-b border-border">
			<Chat accessToken={accessToken} />
		</div>
	);
};
