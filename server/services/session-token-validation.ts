import type { H3Event } from "h3";
import { getByToken } from "@modules/session/actions/retrieveSession";
import User from "@modules/user/dtos/user";

/**
 * Service that gets user information by session token
 * @throws {Error} Error - If the session token is invalid
 * @throws {Error} Error - If the session token is not found
 * @throws {Error} Error - If the session token is expired
 */
export default async function (event: H3Event) {
	const { authToken } = await getUserSessionData(event);

	try {
		if (!authToken) {
			throw new Error();
		}

		const session = await getByToken(authToken);
		return Promise.resolve(User.fromDb(session.users));
	} catch (error) {
		await clearUserSession(event);
		setResponseStatus(event, 401);
		return Promise.reject(null);
	}
}
