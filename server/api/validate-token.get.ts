import authTokenValidation from "@services/auth-token-validation";

export default defineEventHandler(async (event) => {
	const { authToken } = await getUserSessionData(event);

	if (!authToken) {
		return;
	}

	try {
		const user = await authTokenValidation(authToken);
		return { user };
	} catch (error) {
		await clearUserSession(event);
		setResponseStatus(event, 401);
	}
});
