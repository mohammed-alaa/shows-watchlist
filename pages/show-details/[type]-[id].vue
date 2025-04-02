<script setup lang="ts">
import TitleDetailsTv from "../../components/title-details-tv.vue";
import TitleDetailsMovie from "../../components/title-details-movie.vue";

const route = useRoute();
const { type, details, getDetails } = useShowDetails(
	Number(route.params.id),
	route.params.type as TMediaTypes,
);

await getDetails();

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
	<Suspense>
		<!-- <div class="flex flex-col p-4 gap-2"> -->
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
		/>
		<!-- </div> -->
	</Suspense>
</template>
