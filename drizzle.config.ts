import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: ["./database/schemas/*.ts"],
	out: "./database/migrations",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
});
