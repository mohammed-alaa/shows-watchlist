<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import TitleDetailsTv from "@components/title-details-tv.vue";
import TitleDetailsMovie from "@components/title-details-movie.vue";
import { MEDIATYPES } from "@constants";

const route = useRoute();
const {
	lists,
	addToWatchList,
	removeFromWatchList,
	isInWatchList,
	isShowInList,
	addToList,
	removeFromList,
	isLoading,
} = useShowListControl();
const showStore = useShowStore();
const { details, show } = storeToRefs(showStore);

const type = route.params.type as TMediaTypes;

await showStore.getDetails(Number(route.params.id), type);

const dropdownMenuLists = computed<DropdownMenuItem[]>(() => {
	return lists.value.map((list) => ({
		type: "checkbox",
		label: list.name,
		value: list.id,
		checked: computed(() => isShowInList(details.value.id!, list.id)).value,
		async onSelect(e: Event) {
			console.log("onSelect", e);
			e.preventDefault();
			if (isShowInList(details.value.id!, list.id)) {
				await removeFromList(details.value.id!, list.id);
			} else {
				await addToList(details.value.id!, list.id, type);
			}
		},
	}));
});

async function onWatchListButtonClick() {
	if (isInWatchList(details.value.id!)) {
		await removeFromWatchList(details.value.id!);
	} else {
		await addToWatchList(details.value.id!, type);
	}
}

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
		>
			<template #save-to-lists>
				<UButtonGroup>
					<UButton
						variant="subtle"
						label="Watch List"
						:color="
							isInWatchList(details.id!) ? 'error' : 'success'
						"
						:icon="
							isInWatchList(details.id!)
								? 'i-lucide-check'
								: 'i-lucide-plus'
						"
						:loading="isLoading"
						:disabled="isLoading"
						@click="onWatchListButtonClick"
					>
					</UButton>
					<UDropdownMenu
						:items="dropdownMenuLists"
						:disabled="isLoading"
					>
						<UButton
							label="Save"
							icon="i-lucide-menu"
							color="info"
							variant="outline"
							:loading="isLoading"
						/>
					</UDropdownMenu>
				</UButtonGroup>
			</template>
		</component>
	</Suspense>
</template>
