<script setup lang="ts">
const route = useRoute();
const { list, shows, getDetails, deleteList } = useListDetails(
	Number(route.params.id),
);
const { removeFromList } = useShowListControl();

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
			<div class="flex justify-between items-center">
				<h1>{{ list?.name }}</h1>
				<UButton
					color="error"
					v-bind="{
						icon: list.isWatchList
							? 'ic:sharp-clear'
							: 'i-heroicons-trash',
						label: list.isWatchList ? 'Empty' : 'Delete',
					}"
					@click="deleteList(list.id)"
				/>
			</div>

			<div class="flex flex-col py-4 gap-4">
				<template v-if="shows.length">
					<template
						v-for="show in shows"
						:key="`list-details-shows-show-${show.id}`"
					>
						<div class="grid grid-cols-2 grid-rows-1 items-center">
							<NuxtLink
								class="flex-1"
								:to="{
									name: 'show-details',
									params: {
										id: show.tmdbId,
										type: show.type,
									},
								}"
							>
								{{ show.title }}
							</NuxtLink>
							<UButton
								size="xs"
								class="w-fit"
								color="error"
								label="Remove"
								icon="ic:outline-remove"
								@click="removeFromList(show.tmdbId, list.id)"
							/>
						</div>
					</template>
				</template>
				<template v-else>
					<p>
						<span
							>Your list is empty. Start adding shows
							by&nbsp;</span
						>
						<NuxtLink :to="{ name: 'search' }">
							<UButton label="searching" size="xs" />
						</NuxtLink>
						<span>.</span>
					</p>
				</template>
			</div>
		</div>
	</Suspense>
</template>
