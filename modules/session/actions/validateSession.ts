import { decodeSession } from "../utils/sessionTokenHandler";
import { eq } from "drizzle-orm";
// TODO: de-couple the use of user DTO
import User from "@modules/user/dtos/user";

export default async function (token: string) {
	const drizzle = useDrizzle();
	const config = useRuntimeConfig();

	const decodedToken = decodeSession(config.APP_KEY, token);

	if (decodedToken === null) {
		return null;
	}

	const user = await drizzle
		.select({
			id: usersTable.id,
			email: usersTable.email,
			name: usersTable.name,
		})
		.from(sessionsTable)
		.innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
		.where(eq(sessionsTable.session, decodedToken.sessionToken))
		.limit(1);

	if (user.length === 0) {
		return null;
	}

	return User.fromDb(user[0]);
}
