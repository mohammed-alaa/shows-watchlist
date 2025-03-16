import { createHmac, createSecretKey, randomBytes } from "crypto";
import { AUTH_TOKEN_GENERATOR } from "@constants";

export function createToken(secret: string, passwordRounds: number) {
	const secretKey = createSecretKey(secret, AUTH_TOKEN_GENERATOR.ENCODING);
	const randomString = randomBytes(passwordRounds).toString(
		AUTH_TOKEN_GENERATOR.ENCODING,
	);

	return createHmac(AUTH_TOKEN_GENERATOR.HMAC_ALGORITHM, secretKey)
		.update(randomString)
		.digest(AUTH_TOKEN_GENERATOR.TOKEN_ENCODING);
}
