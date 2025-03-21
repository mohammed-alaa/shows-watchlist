import sessionTokenValidation from "@services/session-token-validation";

export default defineEventHandler(async (event) => {
	try {
		const user = await sessionTokenValidation(event);
		return user.withoutPassword();
	} catch (error) {
		return null;
	}
});
