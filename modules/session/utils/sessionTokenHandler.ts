import jwt from "jsonwebtoken";
import { AUTH } from "@constants";

export function decodeSession(
	secret: string,
	token: string,
): TDecodeSessionOutput | null {
	try {
		return jwt.verify(token, secret) as TDecodeSessionOutput;
	} catch (error) {
		return null;
	}
}

export function signSession(secret: string, payload: TCreateSessionPayload) {
	return jwt.sign(payload, secret, {
		expiresIn: Date.now() + AUTH.COOKIE_EXPIRES,
	});
}
