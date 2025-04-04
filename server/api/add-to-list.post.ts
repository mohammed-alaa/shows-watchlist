import sessionTokenValidation from "@services/session-token-validation";
import addToList from "@modules/showListControls/actions/add-to-list";
import createShow from "@modules/shows/actions/createShow";
import { byTmdbId } from "@modules/shows/actions/retrieveShows";
import { getById } from "@services/tmdb/search";

export default defineEventHandler(async (event) => {
	try {
		const user = await sessionTokenValidation(event);
		const { listId, type, showTmdbId } =
			await readBody<TAddToListControls>(event);

		let showId: number;
		const show = await byTmdbId(showTmdbId);

		if (show) {
			showId = show.id;
		} else {
			const details = await getById(showTmdbId, type);
			const { id } = await createShow(
				showTmdbId,
				details.external_ids.imdb_id,
				details.original_title ?? details.original_name,
				type,
			);
			showId = id;
		}

		const entry = await addToList(user.getId()!, listId, showId);
		return { entry };
	} catch (error: any) {
		console.log("test", error);
		return Promise.reject();
	}
});
