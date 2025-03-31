import { getById } from "@services/tmdb/search";

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"));
	const type = getRouterParam(event, "type") as TMediaTypes;

	if (isNaN(id) || !(["movie", "tv"] as TMediaTypes[]).includes(type)) {
		setResponseStatus(event, 400);
		return {
			errors: {
				message: "Invalid ID or type",
			},
		};
	}

	try {
		return await getById(id, type);
	} catch (error: any) {
		setResponseStatus(event, 500);
		return {
			errors: {
				message: error.message,
			},
		};
	}
});
