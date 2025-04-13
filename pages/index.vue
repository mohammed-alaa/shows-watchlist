<script setup lang="ts">
const listStore = useListStore();
const { hasLists, lists } = storeToRefs(listStore);

await listStore.retrieveLists();

definePageMeta({
	name: "index",
});

useSeoMeta({
	title: "Home",
});
</script>

<template>
	<Suspense suspensible>
		<template #fallback>
			<UIcon name="line-md:loading-twotone-loop" />
		</template>

		<div>
			<template v-if="hasLists">
				<div class="flex justify-between items-center">
					<h1>My Lists</h1>
					<NuxtLink :to="{ name: 'create-list' }">
						<UButton label="Create a New List" />
					</NuxtLink>
				</div>

				<div class="flex gap-4 flex-wrap">
					<template v-for="list in lists" :index="`list-${list.id}`">
						<div class="border p-4 rounded">
							<NuxtLink
								:to="{
									name: 'list-details',
									params: { id: list.id },
								}"
							>
								<h2>{{ list.name }}</h2>
							</NuxtLink>
						</div>
					</template>
				</div>
			</template>
			<template v-else>
				<h1>My Lists</h1>
				<div class="flex flex-col justify-between items-center gap-2">
					<p>No lists found.</p>
					<NuxtLink :to="{ name: 'create-list' }" size="xl">
						<UButton label="Create a New List" />
					</NuxtLink>
				</div>
			</template>
		</div>
	</Suspense>
</template>
