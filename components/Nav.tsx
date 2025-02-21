import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
const Chat = dynamic(() => import("@/components/Chat"), {
	ssr: false,
});

// Client component
export const Nav = async () => {
	const accessToken = await getHumeAccessToken();
	if (!accessToken) {
		throw new Error("No access token");
	}
	return (
		<div className="relative border-b border-border">
			<Chat accessToken={accessToken} />
		</div>
	);
};
