import { MEDIATYPES } from "@constants";
import { byTmdbIdWithAddedLists } from "@modules/shows/actions/retrieveShows";
import sessionTokenValidation from "@services/session-token-validation";
import { getById } from "@services/tmdb/search";

export default defineEventHandler(
	async (event): Promise<TRetrieveShowDetailsResponse> => {
		const id = Number(getRouterParam(event, "id"));
		const type = getRouterParam(event, "type") as TMediaTypes;

		if (isNaN(id) || !MEDIATYPES.includes(type)) {
			setResponseStatus(event, 400);
			return Promise.reject({
				errors: {
					message: "Invalid ID or type",
				},
			});
		}

		try {
			const user = await sessionTokenValidation(event);

			try {
				const details = await getById(id, type);
				const show = await byTmdbIdWithAddedLists(
					details.id,
					user.getId()!,
				);

				return {
					details,
					show,
				};
			} catch (error: any) {
				setResponseStatus(event, 500);
				return Promise.reject({
					errors: {
						message: error.message,
					},
				});
			}
		} catch (error: any) {
			return Promise.reject();
		}
	},
);
