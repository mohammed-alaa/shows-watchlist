<script setup lang="ts">
import TitleDetailsTv from "../../components/title-details-tv.vue";
import TitleDetailsMovie from "../../components/title-details-movie.vue";

const route = useRoute();
const { type, details, getDetails, isLoading } = useShowDetails(
	Number(route.params.id),
	route.params.type as TMediaTypes,
);

getDetails();

definePageMeta({
	name: "show-details",
	auth: true,
	validate: (route) => {
		return (
			/^\d+$/.test(route.params.id as string) &&
			(["movie", "tv"] as TMediaTypes[]).includes(
				route.params.type as TMediaTypes,
			)
		);
	},
});

useSeoMeta({
	title: `Show ${route.params.id}`,
});
</script>

<template>
	<!-- <div class="flex flex-col p-4 gap-2"> -->
	<template v-if="isLoading">
		<p>Loading...</p>
	</template>
	<template v-else-if="details">
		<component
			:is="
				type === 'tv'
					? TitleDetailsTv
					: type === 'movie'
						? TitleDetailsMovie
						: 'div'
			"
			:details="details"
		/>
	</template>
	<!-- </div> -->
</template>
