<script setup lang="ts">
const { myLits, hasLists, getLists } = useLists();

await getLists();

definePageMeta({
	name: "index",
});

useSeoMeta({
	title: "Home",
});
</script>

<template>
	<h1>Index Page</h1>
	<Suspense>
		<template #fallback>
			<p>Loading...</p>
		</template>

		<div>
			<NuxtLink :to="{ name: 'create-list' }">
				<button>Create a New List</button>
			</NuxtLink>
			<template v-if="hasLists">
				<h2>My Lists</h2>
				<div class="flex p-4 gap-4">
					<template v-for="list in myLits" :index="`list-${list.id}`">
						<div class="border p-4 my-4 rounded">
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
				<p>No lists found</p>
			</template>
		</div>
	</Suspense>
</template>
