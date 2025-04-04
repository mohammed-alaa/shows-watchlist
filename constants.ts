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
	DELETE_LIST: "/api/lists/:id",
	ADD_TO_LIST: "/api/add-to-list",
	REMOVE_FROM_LIST: "/api/remove-from-list",
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
	API_ROUTES.DELETE_LIST,
	API_ROUTES.ADD_TO_LIST,
	API_ROUTES.REMOVE_FROM_LIST,
];

export const PROTECTED_PAGES_NAMES: string[] = [
	"index",
	"list-details",
	"create-list",
	"search",
	"show-details",
];

export const MEDIATYPE_TV: TMediaTypeTv = "tv";
export const MEDIATYPE_MOVIE: TMediaTypeMovie = "movie";
export const MEDIATYPES: TMediaTypes[] = [MEDIATYPE_TV, MEDIATYPE_MOVIE];
