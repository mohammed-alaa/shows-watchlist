<script setup lang="ts">
defineProps<{
	type: TMediaTypes;
	backdropPath: TTitleCommon["backdrop_path"];
	genresLength: number;
	countriesLength: number;
	languagesLength: number;
}>();
</script>

<template>
	<div
		class="relative border-y bg-cover bg-no-repeat bg-center"
		:style="{
			backgroundImage: `url('https://image.tmdb.org/t/p/original/${backdropPath}')`,
		}"
	>
		<div class="bg-black bg-opacity-70">
			<div class="text-white grid md:grid-cols-2 place-items-center p-8">
				<slot name="logo" />
				<div class="flex flex-col justify-center gap-2">
					<div class="flex flex-wrap justify-between items-center">
						<div>
							<h1 class="text-xl font-bold">
								<slot name="title-name" />
							</h1>
							<p>
								<slot name="tagline" />
							</p>
						</div>
						<slot name="actions" />
					</div>

					<p>
						<slot name="overview" />
					</p>
					<template v-if="type === 'tv'">
						<p>
							<slot name="first_air_date" />
						</p>
					</template>
					<template v-if="type === 'movie'">
						<p>
							<slot name="info" />
						</p>
					</template>

					<div class="flex gap-2">
						<slot name="links" />
					</div>
					<div class="flex flex-wrap gap-1">
						<slot name="genres">
							<template
								v-for="genre in genresLength"
								:key="`genre-${genre - 1}`"
							>
								<UBadge size="sm" variant="subtle">
									<slot
										name="genre-name"
										:genre="genre - 1"
									/>
								</UBadge>
							</template>
						</slot>
					</div>

					<div class="flex flex-warp gap-1">
						<slot name="countries">
							<template
								v-for="country in countriesLength"
								:key="`country-${country - 1}`"
							>
								<UBadge size="sm" variant="subtle">
									<slot
										name="country-name"
										:country="country - 1"
									/>
								</UBadge>
							</template>
						</slot>
					</div>

					<div class="flex flex-warp gap-1">
						<slot name="languages">
							<template
								v-for="language in languagesLength"
								:key="`language-${language - 1}`"
							>
								<UBadge size="sm" variant="subtle">
									<slot
										name="language-name"
										:language="language - 1"
									/>
								</UBadge>
							</template>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</div>

	<template v-if="$slots.seasons">
		<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
			<p class="px-8 text-3xl underline font-bold">Seasons</p>
			<div class="overflow-x-auto flex gap-4 px-8 py-4 justify-start">
				<slot name="seasons" />
			</div>
		</div>
	</template>

	<template v-if="$slots.posters">
		<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
			<p class="px-8 text-3xl underline font-bold">Posters</p>
			<div class="overflow-x-auto flex gap-4 px-8 py-4">
				<slot name="posters" />
			</div>
		</div>
	</template>

	<template v-if="$slots.backdrops">
		<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
			<p class="px-8 text-3xl underline font-bold">Backdrops</p>
			<div class="overflow-x-auto flex gap-4 px-8 py-4">
				<slot name="backdrops" />
			</div>
		</div>
	</template>

	<template v-if="$slots.videos">
		<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
			<p class="px-8 text-3xl underline font-bold">Videos</p>
			<div class="overflow-x-auto flex gap-4 px-8 py-4">
				<slot name="videos" />
			</div>
		</div>
	</template>

	<template v-if="$slots.recommendations">
		<div class="flex flex-col overflow-hidden flex-wrap gap-2 border py-4">
			<p class="px-8 text-3xl underline font-bold">Recommendations</p>
			<div
				class="overflow-x-auto grid lg:grid-cols-4 gap-4 px-8 py-4 justify-start"
			>
				<slot name="recommendations" />
			</div>
		</div>
	</template>
</template>
