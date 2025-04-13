<script setup lang="ts">
import TitleDetails from "../layouts/title-details.vue";

defineProps<{
	details: TShowDetails<TMediaTypeTv>;
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
				:alt="`Poster of ${details.original_name}`"
			/>
		</template>
		<template #title-name>
			{{ details.original_name }}
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

		<template #first_air_date>
			{{ details.first_air_date }}
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

		<template #genres>
			<template
				v-for="genre in details.genres"
				:key="`genre-${genre.id}`"
			>
				<UBadge size="sm" variant="subtle" :label="genre.name" />
			</template>
		</template>
		<template #countries>
			<template
				v-for="country in details.original_country"
				:key="`country-${country}`"
			>
				<UBadge size="sm" variant="subtle" :label="country" />
			</template>
		</template>
		<template #languages>
			<template
				v-for="language in details.spoken_languages"
				:key="`sl-${language.english_name}`"
			>
				<UBadge
					size="sm"
					variant="subtle"
					:label="language.english_name"
				/>
			</template>
		</template>

		<template #seasons>
			<template v-for="season in details.seasons" :key="season.id">
				<div class="max-w-40">
					<p>{{ season.name }}</p>
					<NuxtImg
						loading="lazy"
						:src="
							'https://image.tmdb.org/t/p/original/' +
							season.poster_path
						"
						class="w-52 border rounded-md"
						:alt="`Poster of ${season.name}`"
					/>
					<p class="line-clamp-2">{{ season.overview }}</p>
				</div>
			</template>
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
					:alt="`Poster of ${details.original_name}`"
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
					:alt="`Backdrop of ${details.original_name}`"
				/>
			</template>
		</template>

		<template #videos v-if="false">
			<template
				v-for="video in details.videos.results"
				:key="`videos-${video.id}`"
			>
				<div class="flex flex-col gap-2">
					<iframe
						class="w-52 border rounded-md bg-black bg-opacity-5"
						:src="`https://www.themoviedb.org/video/play?key=${video.key}`"
					/>
					<p>{{ video.name }}</p>
				</div>
			</template>
		</template>

		<template #recommendations>
			<template
				v-for="recommendation in details.recommendations.results"
				:key="recommendation.id"
			>
				<title-card-tv :item="recommendation" />
			</template>
		</template>
	</TitleDetails>
</template>
