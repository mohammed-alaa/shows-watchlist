import jwt from "jsonwebtoken";

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
	return jwt.sign(payload, secret, { expiresIn: "1d" });
}
