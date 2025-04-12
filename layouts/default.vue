<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const auth = useAuthStore();

const authItems: NavigationMenuItem[] = [
	{
		label: "Index",
		icon: "i-lucide-book-open",
		to: {
			name: "index",
		},
	},
	{
		label: "Search",
		icon: "i-lucide-search",
		to: {
			name: "search",
		},
	},
	{
		label: "Logout",
		icon: "i-lucide-heart",
		async onSelect() {
			await logout();
		},
	},
];

const guestItems: NavigationMenuItem[] = [
	{
		label: "Register",
		icon: "i-lucide-search",
		to: {
			name: "register",
		},
	},
	{
		label: "Login",
		icon: "i-lucide-heart",
		to: {
			name: "login",
		},
	},
];

async function logout() {
	await auth.logout();
	navigateTo({ name: "login" });
}
</script>

<template>
	<template v-if="auth.isLoading">
		<p>Loading...</p>
	</template>
	<template v-else>
		<UNavigationMenu
			:items="auth.isUserLoggedIn ? authItems : guestItems"
			class="w-full justify-center"
		/>
	</template>
	<UContainer>
		<NuxtPage />
	</UContainer>
</template>
