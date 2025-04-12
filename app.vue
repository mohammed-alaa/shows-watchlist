<script setup lang="ts">
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
