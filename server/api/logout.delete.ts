import { bySession } from "@modules/session/actions/revokeSession";

export default defineEventHandler(async (event) => {
	const { authToken } = await getUserSessionData(event);

	await clearUserSession(event);
	if (!authToken) {
		return;
	}

	await bySession(authToken);
	sendNoContent(event);
});
