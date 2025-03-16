<script setup lang="ts">
const auth = useAuthStore();

onNuxtReady(() => auth.init());
</script>

<template>
	<main>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</main>
</template>
