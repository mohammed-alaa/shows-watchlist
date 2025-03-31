import searchFormSchema from "@schemas/searchForm";
import { validateScehma } from "@utils/schemaValidator";
import { getByTitle } from "@services/tmdb/search";

export default defineEventHandler(async (event) => {
	const payload = await readBody<TSearchPayload>(event);
	const { page } = getQuery<{
		page: number;
	}>(event);

	try {
		await validateScehma(searchFormSchema, payload);
	} catch (errors: any) {
		setResponseStatus(event, 422);
		return { errors };
	}

	try {
		const response = await getByTitle(payload.search, page);
		return response;
	} catch (error: any) {
		setResponseStatus(event, 400);
		return {
			errors: {
				search: error,
			},
		};
	}
});
