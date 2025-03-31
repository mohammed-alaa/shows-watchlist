<script setup lang="ts">
const auth = useAuthStore();

async function logout() {
	await auth.logout();
	navigateTo({ name: "login" });
}
</script>

<template>
	<nav class="flex gap-4 items-center justify-center">
		<template v-if="auth.isLoading">
			<p>Loading...</p>
		</template>
		<template v-else-if="auth.isUserLoggedIn">
			<NuxtLink :to="{ name: 'index' }">Index</NuxtLink>
			<NuxtLink :to="{ name: 'search' }">Search</NuxtLink>
			<button @click.prevent="logout">Logout</button>
		</template>
		<template v-else>
			<NuxtLink :to="{ name: 'register' }">Register</NuxtLink>
			<NuxtLink :to="{ name: 'login' }">Login</NuxtLink>
		</template>
	</nav>
	<NuxtPage />
</template>
