import validateSession from "@modules/session/actions/validateSession";

export default defineEventHandler(async (event) => {
	const token = getHeader(event, "Authorization");

	if (!token) {
		setResponseStatus(event, 401);
		return;
	}

	const user = await validateSession(token);

	if (!user) {
		setResponseStatus(event, 401);
		return;
	}

	return { user };
});
