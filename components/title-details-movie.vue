<script setup lang="ts">
import TitleDetails from "../layouts/title-details.vue";

defineProps<{
	details: TShowDetails<TMediaTypeMovie>;
}>();
</script>

<template>
	<TitleDetails
		type="movie"
		:languages-length="details.spoken_languages?.length ?? 0"
		:countries-length="details.original_country?.length ?? 0"
		:genres-length="details.genres.length"
		:backdrop-path="details.backdrop_path"
	>
		<template #logo>
			<NuxtImg
				loading="lazy"
				:src="
					'https://image.tmdb.org/t/p/original/' + details.poster_path
				"
				class="rounded-md w-2/4"
				:alt="`Poster of ${details.original_title}`"
			/>
		</template>
		<template #title-name>
			{{ details.original_title }}
		</template>
		<template #tagline>
			{{ details.tagline }}
		</template>
		<template #actions>
			<slot name="save-to-lists" />
		</template>
		<template #overview>
			{{ details.overview }}
		</template>
		<template #info>
			<p>{{ details.runtime }} minutes</p>
			<p>{{ details.status }} @ {{ details.release_date }}</p>
			<p>${{ details.budget }}</p>
		</template>

		<template #links>
			<a target="_blank" :href="details.homepage"> Homepage </a>
			<a
				target="_blank"
				:href="`https://www.imdb.com/title/${details.external_ids.imdb_id}`"
			>
				IMDB
			</a>
		</template>

		<template #genre-name="{ genre }">
			{{ details.genres[genre].name }}
		</template>
		<template #country-name="{ country }">
			{{ details.original_country[country] }}
		</template>
		<template #language-name="{ language }">
			{{ details.spoken_languages[language].english_name }}
		</template>

		<template #posters>
			<template
				v-for="poster in details.images.posters"
				:key="poster.file_path"
			>
				<NuxtImg
					loading="lazy"
					:src="
						'https://image.tmdb.org/t/p/original/' +
						poster.file_path
					"
					class="w-52 border rounded-md"
					:width="poster.width"
					:height="poster.height"
					:aspect-ratio="poster.aspect_ratio"
					:alt="`Poster of ${details.original_title}`"
				/>
			</template>
		</template>
		<template #backdrops>
			<template
				v-for="backdrop in details.images.backdrops"
				:key="backdrop.file_path"
			>
				<NuxtImg
					loading="lazy"
					:src="
						'https://image.tmdb.org/t/p/original/' +
						backdrop.file_path
					"
					class="w-52 border rounded-md"
					:width="backdrop.width"
					:height="backdrop.height"
					:aspect-ratio="backdrop.aspect_ratio"
					:alt="`Backdrop of ${details.original_title}`"
				/>
			</template>
		</template>
		<template #videos v-if="false">
			<template
				v-for="video in details.videos.results"
				:key="`videos-${video.id}`"
			>
				<div class="flex flex-col gap-2 max-w-80">
					<p class="flex-1">{{ video.name }}</p>
					<iframe
						class="bg-black bg-opacity-5 flex-1"
						:src="`https://www.themoviedb.org/video/play?key=${video.key}`"
					/>
				</div>
			</template>
		</template>
		<template #recommendations>
			<template
				v-for="recommendation in details.recommendations.results"
				:key="recommendation.id"
			>
				<title-card-movie :item="recommendation" />
			</template>
		</template>
	</TitleDetails>
</template>
