import { drizzle } from "drizzle-orm/postgres-js";

export * from "../../database/tables";

export function useDrizzle() {
	console.log("db", process.env.POSTGRESS_URL);
	return drizzle(process.env.POSTGRESS_URL!);
}
