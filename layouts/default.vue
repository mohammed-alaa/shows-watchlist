<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const auth = useAuthStore();

const authItems: NavigationMenuItem[] = [
	{
		label: "Index",
		icon: "ic:baseline-home",
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
		icon: "codicon:sign-out",
		async onSelect() {
			await logout();
		},
	},
];

const guestItems: NavigationMenuItem[] = [
	{
		label: "Register",
		icon: "lucide:user-plus",
		to: {
			name: "register",
		},
	},
	{
		label: "Login",
		icon: "material-symbols:login-rounded",
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
	<div class="flex flex-col min-h-screen">
		<div class="flex-none">
			<template v-if="auth.isLoading">
				<p>Loading...</p>
			</template>
			<template v-else>
				<UNavigationMenu
					:items="auth.isUserLoggedIn ? authItems : guestItems"
					class="w-full justify-center"
				/>
			</template>
		</div>
		<UContainer class="flex-grow">
			<NuxtPage />
		</UContainer>
		<AppFooter />
	</div>
</template>
