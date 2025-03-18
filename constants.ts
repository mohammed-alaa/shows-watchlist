export const AUTH = {
	COOKIE_NAME: "authToken",
	COOKIE_EXPIRES: 60 * 2, // 2 minutes
} as const;

export const API_ROUTES = {
	VALIDATE_TOKEN: "/validate-token",
	LOGIN: "/login",
	LOGOUT: "/logout",
	REGISTER: "/register",
} as const;

export const AUTH_TOKEN_GENERATOR = {
	ENCODING: "utf8",
	HMAC_ALGORITHM: "sha512",
	TOKEN_ENCODING: "base64",
} as const;

export const PROTECTED_ROUTES: string[] = ["/", API_ROUTES.LOGOUT];

export const PUBLIC_ROUTES: string[] = [
	API_ROUTES.LOGIN,
	API_ROUTES.REGISTER,
	API_ROUTES.VALIDATE_TOKEN,
];
