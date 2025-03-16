import { eq } from "drizzle-orm";
import { decodeSession } from "../utils/sessionTokenHandler";

export async function bySession(token: string) {
	const drizzle = useDrizzle();
	const config = useRuntimeConfig();

	const decodedToken = decodeSession(config.APP_KEY, token);

	if (decodedToken === null) {
		return;
	}

	await drizzle
		.delete(sessionsTable)
		.where(eq(sessionsTable.session, decodedToken.sessionToken));
}

export async function byUserId(userId: number) {
	const drizzle = useDrizzle();

	await drizzle.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
}
