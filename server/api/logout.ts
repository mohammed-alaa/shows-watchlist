import { bySession } from "@modules/session/actions/revokeSession";
import { AUTH } from "@constants";

export default defineEventHandler(async (event) => {
	const token = getCookie(event, AUTH.COOKIE_NAME);

	if (!token) {
		setResponseStatus(event, 401);
		deleteCookie(event, AUTH.COOKIE_NAME);
		return;
	}

	await bySession(token);
	sendNoContent(event);
});
