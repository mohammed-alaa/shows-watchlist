import validateSession from "@modules/session/actions/validateSession";
import { AUTH } from "@constants";

export default defineEventHandler(async (event) => {
	const token = getCookie(event, AUTH.COOKIE_NAME);

	if (!token) {
		setResponseStatus(event, 401);
		deleteCookie(event, AUTH.COOKIE_NAME);
		return;
	}

	const user = await validateSession(token);

	if (!user) {
		setResponseStatus(event, 401);
		deleteCookie(event, AUTH.COOKIE_NAME);
		return;
	}

	return { user };
});
