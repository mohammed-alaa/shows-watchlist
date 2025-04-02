export const AUTH = {
	COOKIE_NAME: "authToken",
	COOKIE_EXPIRES: 60 * 30,
} as const;

export const API_ROUTES = {
	VALIDATE_SESSION: "/api/validate-session",
	LOGIN: "/api/login",
	LOGOUT: "/api/logout",
	REGISTER: "/api/register",
	SEARCH: "/api/search",
	SHOW_DETAILS: "/api/show-details/:type/:id",
	RETRIEVE_LISTS: "/api/lists",
	CREATE_LIST: "/api/lists",
	LIST_DETAILS: "/api/lists/:id",
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
	API_ROUTES.RETRIEVE_LISTS,
	API_ROUTES.CREATE_LIST,
	API_ROUTES.LIST_DETAILS,
];

export const PROTECTED_PAGES_NAMES: string[] = [
	"index",
	"create-list",
	"search",
	"show-details",
	"list-details",
];
