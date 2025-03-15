import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.vue",
		"./components/**/*.vue",
		"./assets/css/**/*.css",
	],
	theme: {
		extend: {},
	},
} as Config;
