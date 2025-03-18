import { getByToken } from "@modules/session/actions/retrieveSession";
import { getById } from "@modules/user/actions/getUser";
import User from "@modules/user/dtos/user";

/**
 * Service that gets user information by session token
 * @param {string} token - Session token
 * @returns {User} User information
 */
export default async function (token: string): Promise<User> {
	const session = await getByToken(token);
	const dbUser = await getById(session.userId);

	return Promise.resolve(dbUser);
}
