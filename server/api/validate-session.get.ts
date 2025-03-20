import sessionTokenValidation from "@services/session-token-validation";

export default defineEventHandler(
	async (event): Promise<undefined | { user: TUser }> => {
		try {
			const user = await sessionTokenValidation(event);
			return { user: user.withoutPassword() };
		} catch (error) {}
	},
);
