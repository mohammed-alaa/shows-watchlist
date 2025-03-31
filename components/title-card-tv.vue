<script setup lang="ts">
defineProps<{
	item: TTitleTypeTv;
}>();
</script>

<template>
	<NuxtLink
		:to="{
			name: 'show-details',
			params: { type: item.media_type, id: item.id },
		}"
	>
		<div class="rounded-md border flex flex-col relative">
			<img
				:src="'https://image.tmdb.org/t/p/original/' + item.poster_path"
				class="h-96 mx-auto"
				:alt="`Poster of ${item.original_name}`"
			/>
			<div class="bg-gray-100 flex-1 flex flex-col p-4">
				<div class="flex gap-2 items-center">
					<p
						class="bg-black bg-opacity-70 text-white text-sm px-2 rounded"
						v-text="'Adult'"
						v-show="item.adult"
					/>
					<p dir="auto" class="flex-1">
						{{ item.original_name }}
					</p>
				</div>
				<p class="text-sm">
					{{ new Date(item.first_air_date).toLocaleDateString() }}
				</p>
				<p class="line-clamp-2">
					{{ item.overview }}
				</p>
			</div>
		</div>
	</NuxtLink>
</template>
