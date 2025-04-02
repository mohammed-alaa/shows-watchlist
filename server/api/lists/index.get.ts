import { byUserId } from "@modules/lists/actions/retrieveLists";
import sessionTokenValidation from "@services/session-token-validation";

export default defineEventHandler(async (event) => {
	try {
		const user = await sessionTokenValidation(event);

		const lists = await byUserId(user.id!);

		return lists;
	} catch (error) {
		return null;
	}
});
