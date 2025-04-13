import sessionTokenValidation from "@services/session-token-validation";
import removeFromList from "@modules/showListControls/actions/remove-from-list";
import { byTmdbId } from "@modules/shows/actions/retrieveShows";

export default defineEventHandler(async (event) => {
	try {
		const user = await sessionTokenValidation(event);
		const { listId, showTmdbId } =
			await readBody<TRemoveFromListControls>(event);

		const show = await byTmdbId(showTmdbId);
		const entry = await removeFromList(user.getId()!, listId, show!.id);

		return entry;
	} catch (error: any) {
		console.log("test", error);
		return Promise.reject();
	}
});
