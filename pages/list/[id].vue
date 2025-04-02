<script setup lang="ts">
const route = useRoute();
const { details, getDetails } = useListDetails(Number(route.params.id));

await getDetails();

definePageMeta({
	name: "list-details",
	auth: true,
	validate: (route) => {
		return /^\d+$/.test(route.params.id as string);
	},
});

useSeoMeta({
	title: `List Details - ${details.value.name}`,
});
</script>

<template>
	<Suspense>
		<template #fallback>
			<p>Loading...</p>
		</template>

		<div class="flex flex-col p-4 gap-2">
			<h1>{{ details.name }}</h1>
		</div>
	</Suspense>
</template>
