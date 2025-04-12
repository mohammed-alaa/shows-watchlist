import { resolve } from "path";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	app: {
		head: {
			meta: [
				{
					charset: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
			],
		},
	},
	runtimeConfig: {
		TMDB_API_KEY: process.env.TMDB_API_KEY,
		PASSWORD_ROUNDS: process.env.PASSWORD_ROUNDS,
		APP_KEY: process.env.APP_KEY,
		public: {
			APP_URL: process.env.APP_URL,
		},
	},
	css: ["./assets/css/base.css"],
	extensions: [".ts", ".vue"],
	modules: ["@pinia/nuxt", "@nuxt/ui"],
	alias: {
		"@schemas": resolve(__dirname, "schemas"),
		"@modules": resolve(__dirname, "modules"),
		"@components": resolve(__dirname, "components"),
		"@services": resolve(__dirname, "server", "services"),
		"@utils": resolve(__dirname, "utils"),
		"@constants": resolve(__dirname, "constants.ts"),
	},
});
