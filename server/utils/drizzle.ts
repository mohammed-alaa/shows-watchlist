import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";

export * from "../../database/tables";

export function useDrizzle() {
	return drizzle(process.env.POSTGRESS_URL!);
}
