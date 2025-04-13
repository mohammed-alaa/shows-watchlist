import { byIdWithShows } from "@modules/lists/actions/retrieveLists";
import sessionTokenValidation from "@services/session-token-validation";

export default defineEventHandler(async (event): Promise<TListWithShows> => {
	const id = Number(getRouterParam(event, "id"));

	try {
		const user = await sessionTokenValidation(event);
		return await byIdWithShows(id, user.getId()!);
	} catch (error) {
		console.log("error", error);
		setResponseStatus(event, 404);
		return Promise.reject();
	}
});
