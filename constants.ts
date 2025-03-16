export const AUTH = {
	COOKIE_NAME: "authToken",
	COOKIE_EXPIRES: 1000 * 60 * 2, // 2 minutes
} as const;

export const API_ROUTES = {
	VALIDATE_TOKEN: "/api/validate-token",
	LOGIN: "/api/login",
	LOGOUT: "/api/logout",
	REGISTER: "/api/register",
} as const;

export const AUTH_TOKEN_GENERATOR = {
	ENCODING: "utf8",
	HMAC_ALGORITHM: "sha512",
	TOKEN_ENCODING: "base64",
} as const;
