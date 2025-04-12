<script setup lang="ts">
import TitleCardMovie from "../components/title-card-movie.vue";
import TitleCardTv from "../components/title-card-tv.vue";

const searchStore = useSearchStore();
const {
	data,
	isLoading,
	hasErrors,
	results,
	errors,
	page,
	totalPages,
	showPagination,
} = storeToRefs(searchStore);

definePageMeta({
	name: "search",
});

useSeoMeta({
	title: "Search",
});
</script>

<template>
	<h1>Search</h1>

	<div class="container mx-auto py-4">
		<form
			method="post"
			class="flex flex-col gap-4"
			@submit.prevent="searchStore.submit"
		>
			<UFormField name="search" :error="errors.search">
				<UInput
					placeholder="Search"
					id="search"
					type="text"
					class="w-full"
					:disabled="isLoading"
					v-model="data.search"
				/>
			</UFormField>
		</form>

		<template v-if="isLoading">
			{{ console.log("isLoading") }}
			<p>Loading...</p>
		</template>
		<template v-else-if="hasErrors">
			<p>{{ errors.search }}</p>
		</template>
		<template v-else>
			<div
				class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
			>
				<template v-for="item in results" :key="`title-${item.id}`">
					<component
						:is="
							item.media_type === 'tv'
								? TitleCardTv
								: item.media_type === 'movie'
									? TitleCardMovie
									: 'div'
						"
						:item="item"
					/>
				</template>
			</div>
			<template v-if="showPagination">
				<UPagination
					class="grid place-items-center mt-4"
					show-controls
					:sibling-count="2"
					:items-per-page="results.length"
					:total="totalPages * results.length"
					v-model:page="page"
				/>
			</template>
		</template>
	</div>
</template>
