<script setup lang="ts">
import TitleDetailsTv from "@components/title-details-tv.vue";
import TitleDetailsMovie from "@components/title-details-movie.vue";
import { MEDIATYPES } from "@constants";

const route = useRoute();
const {
	addToWatchList,
	removeFromWatchList,

	isInWatchList,
} = useShowListControl();
const showStore = useShowStore();
const { details, show } = storeToRefs(showStore);

const type = route.params.type as TMediaTypes;

await showStore.getDetails(Number(route.params.id), type);

definePageMeta({
	name: "show-details",
	validate: (route) => {
		return (
			/^\d+$/.test(route.params.id as string) &&
			MEDIATYPES.includes(route.params.type as TMediaTypes)
		);
	},
});

useSeoMeta({
	title: `Show ${route.params.id}`,
});
</script>

<template>
	<Suspense>
		<template #fallback>
			<p>Loading...</p>
		</template>

		<component
			:is="
				type === 'tv'
					? TitleDetailsTv
					: type === 'movie'
						? TitleDetailsMovie
						: 'div'
			"
			:details="details"
			:is-in-watchlist="isInWatchList(show?.tmdbId)"
			@add-to-watch-list="addToWatchList(details!.id, type)"
			@remove-from-watch-list="removeFromWatchList(details!.id)"
		/>
	</Suspense>
</template>
