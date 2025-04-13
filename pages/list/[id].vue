<script setup lang="ts">
const route = useRoute();
const { list, shows, getDetails } = useListDetails(Number(route.params.id));

await getDetails();

definePageMeta({
	name: "list-details",
	validate: (route) => {
		return /^\d+$/.test(route.params.id as string);
	},
});

useSeoMeta({
	title: `List Details - ${list.value?.name}`,
});
</script>

<template>
	<Suspense>
		<template #fallback>
			<p>Loading...</p>
		</template>

		<div>
			<div class="flex flex-col p-4">
				<h1>{{ list?.name }}</h1>
			</div>

			<div class="flex flex-col p-4">
				<template v-if="shows.length">
					<template
						v-for="show in shows"
						:key="`list-details-shows-show-${show.id}`"
					>
						<NuxtLink
							:to="{
								name: 'show-details',
								params: { id: show.tmdbId, type: show.type },
							}"
						>
							{{ show.title }}
						</NuxtLink>
					</template>
				</template>
				<template v-else>
					<p>
						<span
							>Your list is empty. Start adding shows
							by&nbsp;</span
						>
						<NuxtLink :to="{ name: 'search' }">searching</NuxtLink>
						<span>.</span>
					</p>
				</template>
			</div>
		</div>
	</Suspense>
</template>
