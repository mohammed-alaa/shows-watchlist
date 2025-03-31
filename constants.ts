export const AUTH = {
	COOKIE_NAME: "authToken",
} as const;

export const API_ROUTES = {
	VALIDATE_SESSION: "/validate-session",
	LOGIN: "/login",
	LOGOUT: "/logout",
	REGISTER: "/register",
	SEARCH: "/search",
	SHOW_DETAILS: "/show-details/:type/:id",
} as const;

export const AUTH_TOKEN_GENERATOR = {
	ENCODING: "utf8",
	HMAC_ALGORITHM: "sha512",
	TOKEN_ENCODING: "base64",
} as const;

export const PROTECTED_ROUTES: string[] = [
	"/",
	API_ROUTES.SEARCH,
	API_ROUTES.SHOW_DETAILS,
	API_ROUTES.LOGOUT,
];

export const PUBLIC_ROUTES: string[] = [
	API_ROUTES.LOGIN,
	API_ROUTES.REGISTER,
	API_ROUTES.VALIDATE_SESSION,
];
