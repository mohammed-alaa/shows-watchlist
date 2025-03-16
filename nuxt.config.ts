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
		PASSWORD_ROUNDS: process.env.PASSWORD_ROUNDS,
		APP_KEY: process.env.APP_KEY,
		public: {
			APP_URL: process.env.APP_URL,
		},
	},
	nitro: { preset: "vercel" },
	extensions: [".ts", ".vue"],
	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	alias: {
		"@schemas": resolve(__dirname, "schemas"),
		"@modules": resolve(__dirname, "modules"),
		"@utils": resolve(__dirname, "utils"),
	},
});
