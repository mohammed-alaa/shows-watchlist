import { drizzle } from "drizzle-orm/postgres-js";
export { sql, eq, and, or } from "drizzle-orm";

export * from "../../database/schemas";

export function useDrizzle() {
	return drizzle(process.env.POSTGRESS_URL!);
}
