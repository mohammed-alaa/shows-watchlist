import type { H3Event, SessionConfig } from "h3";
import { AUTH } from "@constants";

let sessionConfig: SessionConfig | null = null;

export function getSessionConfig(event: H3Event) {
	if (!sessionConfig) {
		const config = useRuntimeConfig(event);
		sessionConfig = {
			name: AUTH.COOKIE_NAME,
			password: config.APP_KEY,
			cookie: {
				httpOnly: true,
				secure: true,
				expires: new Date(Date.now() + AUTH.COOKIE_EXPIRES),
			},
		};
	}

	return sessionConfig;
}

export async function getUserSession(event: H3Event) {
	return await useSession<TUserSessionData>(event, getSessionConfig(event));
}

export async function clearUserSession(event: H3Event) {
	const session = await getUserSession(event);
	await session.clear();
	return Promise.resolve();
}

export async function getUserSessionData(
	event: H3Event,
): Promise<TUserSessionData> {
	const session = await getUserSession(event);

	return session.data;
}

export async function setUserSessionData(
	event: H3Event,
	data: TUserSessionData,
) {
	const session = await getUserSession(event);

	await clearUserSession(event);
	await session.update(data);
	return Promise.resolve();
}

export async function appendUserSessionData(
	event: H3Event,
	data: TUserSessionData,
) {
	const session = await getUserSession(event);

	await setUserSessionData(event, {
		...session.data,
		...data,
	});
	return Promise.resolve();
}
