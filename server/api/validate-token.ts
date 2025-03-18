import validateSession from "@modules/session/actions/validateSession";
import { AUTH } from "@constants";

export default defineEventHandler(async (event) => {
	const { authToken } = await getUserSessionData(event);

	if (!authToken) {
		return;
	}

	const user = await validateSession(authToken);

	if (!user) {
		setResponseStatus(event, 401);
		deleteCookie(event, AUTH.COOKIE_NAME);
		return;
	}

	return { user };
});
