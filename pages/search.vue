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
	auth: true,
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
			<div class="form-control">
				<input
					id="search"
					placeholder="Search"
					class="form-control"
					:disabled="isLoading"
					v-model="data.search"
				/>
			</div>
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
				<div
					class="flex flex-wrap justify-center items-center gap-2 mt-4"
				>
					<template
						v-for="pageNumber in totalPages"
						:key="`search-page-${pageNumber}`"
					>
						<button
							class="px-4 py-2 rounded"
							@click="searchStore.goToPage(pageNumber)"
							:class="{
								'bg-blue-500 text-white cursor-not-allowed':
									pageNumber === page,
								'bg-gray-200': pageNumber !== page,
							}"
						>
							{{ pageNumber }}
						</button>
					</template>
				</div>
			</template>
		</template>
	</div>
</template>

<style scoped>
.form-control {
	@apply flex flex-col gap-2;
}

input {
	@apply px-2 py-1 border border-gray-500 rounded;
}
</style>
