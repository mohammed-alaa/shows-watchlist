import { eq } from "drizzle-orm";
import { decodeSession } from "../utils/sessionTokenHandler";
import { cleanToken } from "../utils/authTokenHandler";

export async function BySession(token: string) {
	const drizzle = useDrizzle();
	const config = useRuntimeConfig();

	const decodedToken = decodeSession(config.APP_KEY, cleanToken(token));

	if (decodedToken === null) {
		return;
	}

	await drizzle
		.delete(sessionsTable)
		.where(eq(sessionsTable.session, decodedToken.sessionToken));
}

export async function ByUserId(userId: number) {
	const drizzle = useDrizzle();

	await drizzle.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
}
