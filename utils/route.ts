import { PROTECTED_ROUTES, PUBLIC_ROUTES, API_ROUTES } from "@constants";

const API_START = "/api";

type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
type TWithApiPrefix<T extends ApiRoute> = `${typeof API_START}${T}`;

/**
 * Check if a route is protected
 * @param path The path of the route
 * @param strict If true, the path will be checked as is, otherwise it will be checked as an API route
 * @returns True if the route is protected
 */
export function isRouteProtected(
	path: string,
	strict: boolean = true,
): boolean {
	if (!strict && !isRouteApi(path)) {
		path += API_START;
	}

	return PROTECTED_ROUTES.includes(path);
}

/**
 * Check if a route is public
 * @param path The path of the route
 * @param strict If true, the path will be checked as is, otherwise it will be checked as
 * @returns True if the route is public
 */
export function isRoutePublic(path: string, strict: boolean = true): boolean {
	if (!strict && !isRouteApi(path)) {
		path += API_START;
	}
	return PUBLIC_ROUTES.includes(path);
}

/**
 * Check if a route is an API route
 * @param path The path of the route
 * @returns True if the route is an API route
 */
export function isRouteApi(path: string): boolean {
	return path.startsWith(API_START);
}

/**
 * Add the API prefix to a route
 * @param path The path of the route
 * @returns The path with the API prefix
 */
export function withApiPrefix<
	T extends ApiRoute,
	TParams extends Record<string, any>,
>(path: T, params: TParams | null = null): TWithApiPrefix<T> {
	let url = `${API_START}${path}`;

	if (params !== null) {
		for (const [key, value] of Object.entries(params)) {
			url = url.replace(`:${key}`, value as string);
		}
	}

	return url as TWithApiPrefix<T>;
}
