<script setup lang="ts">
const authStore = useAuthStore();
const listStore = useListStore();
await Promise.all([authStore.init(), listStore.retrieveLists()]);
</script>

<template>
	<UApp>
		<Suspense>
			<template #fallback>
				<NuxtLoadingIndicator />
			</template>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</Suspense>
	</UApp>
</template>
