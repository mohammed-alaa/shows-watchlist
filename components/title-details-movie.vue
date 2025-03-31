<script setup lang="ts">
defineProps<{
	details: TShowDetails<"movie">;
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
					:alt="`Poster of ${details.original_title}`"
				/>
				<div class="flex flex-col justify-center gap-2">
					<div>
						<h1 class="text-xl font-bold">
							{{ details.original_title }}
						</h1>
						<p>{{ details.tagline }}</p>
					</div>
					<p>{{ details.overview }}</p>
					<p>{{ details.runtime }} minutes</p>
					<p>{{ details.status }} @ {{ details.release_date }}</p>
					<p>${{ details.budget }}</p>

					<div class="flex items-center gap-1 text-sm">
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

	<div class="flex flex-wrap gap-2">
		<p>Posters</p>
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
					:alt="`Poster of ${details.original_title}`"
				/>
			</template>
		</div>
	</div>
	<div class="flex flex-wrap gap-4">
		<p>Backdrops</p>
		<div class="overflow-x-auto flex gap-4 px-2 py-4">
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
					:alt="`Backdrop of ${details.original_title}`"
				/>
			</template>
		</div>
	</div>
	<div class="flex flex-wrap gap-4">
		<p>Videos</p>
		<div class="overflow-x-auto flex gap-4 px-2 py-4">
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
		</div>
	</div>
</template>
