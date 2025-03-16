import { bySession } from "@modules/session/actions/revokeSession";

export default defineEventHandler(async (event) => {
	const token = getRequestHeader(event, "Authorization");

	if (!token) {
		setResponseStatus(event, 401);
		return;
	}

	await bySession(token);
	sendNoContent(event);
});
