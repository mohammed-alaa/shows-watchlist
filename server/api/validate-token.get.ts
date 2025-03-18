import authTokenValidation from "@services/auth-token-validation";

export default defineEventHandler(
	async (event): Promise<undefined | { user: TUser }> => {
		const { authToken } = await getUserSessionData(event);

		if (!authToken) {
			return;
		}

		try {
			const user = await authTokenValidation(authToken);
			return { user: user.withoutPassword() };
		} catch (error) {
			await clearUserSession(event);
			setResponseStatus(event, 401);
		}
	},
);
