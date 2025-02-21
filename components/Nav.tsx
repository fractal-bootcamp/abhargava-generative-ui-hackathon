import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
	ssr: false,
});

export const Nav = async () => {
	const accessToken = await getHumeAccessToken();

	if (!accessToken) {
		throw new Error("No access token");
	}
	return (
		<div className="px-4 py-2 h-14 z-50 bg-card border-b border-border">
			<div>
				<Chat accessToken={accessToken} />
			</div>
		</div>
	);
};
