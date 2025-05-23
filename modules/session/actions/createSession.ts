import { signSession } from "../utils/sessionTokenHandler";
import { createToken } from "../utils/authTokenHandler";

export default async function (userId: number) {
	const drizzle = useDrizzle();
	const config = useRuntimeConfig();

	const sessionToken = createToken(
		config.APP_KEY,
		Number(config.PASSWORD_ROUNDS),
	);

	const jwtToken = signSession(config.APP_KEY, { sessionToken });

	await drizzle
		.insert(sessionsTable)
		.values({
			session: sessionToken,
			userId,
		})
		.onConflictDoUpdate({
			target: sessionsTable.userId,
			set: {
				session: sessionToken,
			},
		});

	return jwtToken;
}
