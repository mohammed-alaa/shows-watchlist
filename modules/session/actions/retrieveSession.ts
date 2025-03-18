import { decodeSession } from "../utils/sessionTokenHandler";
import { eq } from "drizzle-orm";

export async function getByToken(token: string) {
	const drizzle = useDrizzle();
	const config = useRuntimeConfig();

	const decodedToken = decodeSession(config.APP_KEY, token);

	if (decodedToken === null) {
		return Promise.reject();
	}

	const session = await drizzle
		.select()
		.from(sessionsTable)
		.where(eq(sessionsTable.session, decodedToken.sessionToken))
		.limit(1);

	if (session.length === 0) {
		return Promise.reject();
	}

	return Promise.resolve(session[0]);
}

export async function getByUserId(userId: number) {
	const drizzle = useDrizzle();

	const session = await drizzle
		.select()
		.from(sessionsTable)
		.where(eq(sessionsTable.userId, userId))
		.limit(1);

	if (session.length === 0) {
		return Promise.reject();
	}

	return Promise.resolve(session[0]);
}
