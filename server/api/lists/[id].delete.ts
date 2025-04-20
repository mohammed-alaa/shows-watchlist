import { byId as deleteListById } from "@modules/lists/actions/deleteList";
import emptyList from "@modules/showListControls/actions/empty-list";
import { byId as retrieveListById } from "@modules/lists/actions/retrieveLists";
import sessionTokenValidation from "@services/session-token-validation";

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, "id"));

	try {
		const user = await sessionTokenValidation(event);
		try {
			const list = await retrieveListById(id);

			if (list.userId !== user.id) {
				setResponseStatus(event, 403);
				return;
			}

			if (list.isWatchList) {
				await emptyList(user.getId()!, list.id);
			} else {
				await deleteListById(id);
			}

			sendNoContent(event);
		} catch (error) {
			setResponseStatus(event, 404);
		}
	} catch (error) {}
});
