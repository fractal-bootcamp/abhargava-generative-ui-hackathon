import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import { Nav } from "./Nav";

export async function NavWrapper() {
	const accessToken = await getHumeAccessToken();

	if (!accessToken) {
		throw new Error("No access token");
	}

	return <Nav accessToken={accessToken} />;
}
