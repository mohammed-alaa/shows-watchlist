<script setup lang="ts">
const auth = useAuthStore();

await auth.init();
</script>

<template>
	<Suspense>
		<template #fallback>
			<p>Loading...</p>
		</template>

		<main>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</main>
	</Suspense>
</template>
