import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useGameStore } from "./store/useGameStore";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ConfigDropdown() {
	const configId = useGameStore((state) => state.currentConfigId);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-1.5 h-10 px-4 bg-black text-white hover:bg-black/90 appearance-none"
				>
					<Settings
						className="size-4 opacity-50"
						strokeWidth={2}
						stroke="currentColor"
					/>
					<span>Mode</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{useGameStore.getState().configs.map((config) => (
					<DropdownMenuItem
						key={config.id}
						onClick={() => useGameStore.getState().setConfigId(config.id)}
					>
						{config.alias}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
