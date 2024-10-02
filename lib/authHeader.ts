import Cookies from "js-cookie";

export function AuthHeader() {
	const token = Cookies.get("token");

	if (!token) {
		return {};
	}

	return {
	    'content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
}
