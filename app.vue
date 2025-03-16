<script setup lang="ts">
const auth = useAuthStore();

auth.init();
</script>

<template>
	<main>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</main>
</template>
