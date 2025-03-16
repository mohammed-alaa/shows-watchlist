import { createHmac, createSecretKey, randomBytes } from "crypto";

export function createToken(secret: string, passwordRounds: number) {
	const secretKey = createSecretKey(secret, "utf8");
	const randomString = randomBytes(passwordRounds).toString("utf8");

	return createHmac("sha512", secretKey)
		.update(randomString)
		.digest("base64");
}

export function buildToken(token: string) {
	return `Bearer ${token}`;
}

export function cleanToken(token: string) {
	return token.replace("Bearer ", "");
}
