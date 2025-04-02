import { PROTECTED_ROUTES, PROTECTED_PAGES_NAMES } from "@constants";

const API_START = "/api";

/**
 * Check if a route is protected
 * @param path The path of the route
 * @param strict If true, the path will be checked as is, otherwise it will be checked as an API route
 * @returns True if the route is protected
 */
export function isRouteProtected(path: string): boolean {
	return PROTECTED_ROUTES.includes(path);
}

/**
 * Check if a route is public
 * @param path The path of the route
 * @returns True if the route is public
 */
export function isRoutePublic(path: string): boolean {
	return !isRouteProtected(path);
}

/**
 * Check if a page is protected
 * @param name The name of the page
 * @returns True if the page is protected
 */
export function isPageProtected(name: string): boolean {
	return PROTECTED_PAGES_NAMES.includes(name);
}

/**
 * Check if a page is public
 * @param name The name of the page
 * @returns True if the page is public
 */
export function isPagePublic(name: string): boolean {
	return !isPageProtected(name);
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
 * Substitute route parameters in a path
 * @param path The path with parameters
 * @param params The parameters to substitute
 * @returns The path with the parameters substituted
 */
export function substituteRouteParams(path: string, params: object): string {
	for (const [key, value] of Object.entries(params)) {
		path = path.replace(`:${key}`, value as string);
	}

	return path;
}
