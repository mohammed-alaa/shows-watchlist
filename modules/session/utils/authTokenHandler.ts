import { createHmac, createSecretKey, randomBytes } from "crypto";

const ENCODING = "utf8";
const TOKEN_BUILD_WORD = "Bearer ";
const HMAC_ALGORITHM = "sha512";
const TOKEN_ENCODING = "base64";

export function createToken(secret: string, passwordRounds: number) {
	const secretKey = createSecretKey(secret, ENCODING);
	const randomString = randomBytes(passwordRounds).toString(ENCODING);

	return createHmac(HMAC_ALGORITHM, secretKey)
		.update(randomString)
		.digest(TOKEN_ENCODING);
}

export function buildToken(token: string) {
	return TOKEN_BUILD_WORD + token;
}

export function cleanToken(token: string) {
	return token.replace(TOKEN_BUILD_WORD, "");
}
