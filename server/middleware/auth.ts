import sessionTokenValidation from "@services/session-token-validation";
import {
	isRouteApi,
	isRouteProtected,
	substituteRouteParams,
} from "@utils/route";

export default defineEventHandler(async (event) => {
	if (!isRouteApi(event.path)) {
		return;
	}

	const routeParams = getRouterParams(event);

	if (isRouteProtected(substituteRouteParams(event.path, routeParams))) {
		try {
			const user = await sessionTokenValidation(event);
			event.context.user = user;
		} catch (error) {
			return sendError(
				event,
				createError({
					statusCode: 401,
				}),
			);
		}
	}
});
