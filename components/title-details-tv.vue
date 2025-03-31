<script setup lang="ts">
defineProps<{
	details: TShowDetails<"tv">;
}>();
</script>

<template>
	<div
		class="relative border-y bg-cover bg-no-repeat bg-center"
		:style="{
			backgroundImage: `url('https://image.tmdb.org/t/p/original/${details.backdrop_path}')`,
		}"
	>
		<div class="bg-black bg-opacity-70">
			<div class="text-white grid md:grid-cols-2 place-items-center p-8">
				<img
					:src="
						'https://image.tmdb.org/t/p/original/' +
						details.poster_path
					"
					class="rounded-md w-2/4"
					:alt="`Poster of ${details.original_name}`"
				/>
				<div class="flex flex-col justify-center gap-2">
					<div class="flex flex-wrap justify-between items-center">
						<div>
							<h1 class="text-xl font-bold">
								{{ details.original_name }}
							</h1>
							<p>{{ details.tagline }}</p>
						</div>
						<button
							class="bg-blue-500 text-white px-4 py-2 rounded"
						>
							<!-- @click="searchStore.toggleWatchlist(details)" -->
							<!-- {{ searchStore.isInWatchlist(details) ? 'Remove from' : 'Add to' }} -->
							Watchlist
						</button>
					</div>

					<p>
						{{ details.overview }}
					</p>
					<p>{{ details.first_air_date }}</p>

					<div class="flex gap-2">
						<a target="_blank" :href="details.homepage">
							Homepage
						</a>
						<a
							target="_blank"
							:href="`https://www.imdb.com/title/${details.external_ids.imdb_id}`"
						>
							IMDB
						</a>
					</div>
					<div class="flex flex-wrap gap-1">
						<template
							v-for="genre in details.genres"
							:key="`genre-${genre.id}`"
						>
							<Chip :text="genre.name" />
						</template>
					</div>

					<div class="flex flex-warp gap-1">
						<template
							v-for="country in details.original_country"
							:key="`country-${country}`"
						>
							<Chip :text="country" />
						</template>
					</div>

					<div class="flex flex-wrap gap-1">
						<template
							v-for="language in details.spoken_languages"
							:key="`sl-${language.english_name}`"
						>
							<Chip :text="language.english_name" />
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
		<p class="px-8 text-3xl underline font-bold">Seasons</p>
		<div class="overflow-x-auto flex gap-4 px-8 py-4 justify-start">
			<template v-for="season in details.seasons" :key="season.id">
				<div class="max-w-40">
					<p>{{ season.name }}</p>
					<img
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
		</div>
	</div>

	<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
		<p class="px-8 text-3xl underline font-bold">Posters</p>
		<div class="overflow-x-auto flex gap-4 px-8 py-4">
			<template
				v-for="poster in details.images.posters"
				:key="poster.file_path"
			>
				<img
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
		</div>
	</div>
	<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
		<p class="px-8 text-3xl underline font-bold">Backdrops</p>
		<div class="overflow-x-auto flex gap-4 px-8 py-4">
			<template
				v-for="backdrop in details.images.backdrops"
				:key="backdrop.file_path"
			>
				<img
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
		</div>
	</div>
	<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
		<p class="px-8 text-3xl underline font-bold">Videos</p>
		<div class="overflow-x-auto flex gap-4 px-8 py-4">
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
		</div>
	</div>

	<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
		<p class="px-8 text-3xl underline font-bold">Recommendations</p>
		<div
			class="overflow-x-auto grid lg:grid-cols-4 gap-4 px-8 py-4 justify-start"
		>
			<template
				v-for="recommendation in details.recommendations.results"
				:key="recommendation.id"
			>
				<title-card-tv :item="recommendation" />
			</template>
		</div>
	</div>
</template>
