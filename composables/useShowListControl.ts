import { API_ROUTES } from "@constants";

export default function () {
	const { isLoading, withLoading } = useLoading();
	const { watchList, hasLists, lists } = storeToRefs(useListStore());
	const showStore = useShowStore();
	const { show } = storeToRefs(showStore);

	async function addToList(
		showTmdbId: TAddToListControls["showTmdbId"],
		listId: TAddToListControls["listId"],
		type: TAddToListControls["type"],
	) {
		if (isShowInList(showTmdbId, listId)) {
			return;
		}

		const { entry } = await withLoading(() =>
			$fetch(API_ROUTES.ADD_TO_LIST, {
				method: "POST",
				body: {
					listId,
					showTmdbId,
					type,
				},
			}),
		);

		if (!show.value!.lists) {
			show.value!.lists = [entry];
		} else {
			show.value!.lists.push(entry);
		}
	}

	async function removeFromList(
		showTmdbId: TRemoveFromListControls["showTmdbId"],
		listId: TRemoveFromListControls["listId"],
	) {
		if (!isShowInList(showTmdbId, listId)) {
			return;
		}

		const entry = await withLoading(() =>
			$fetch<TShowList>(API_ROUTES.REMOVE_FROM_LIST, {
				method: "DELETE",
				body: {
					listId,
					showTmdbId,
				} as TRemoveFromListControls,
			}),
		);

		show.value!.lists =
			show.value!.lists?.filter(
				(list) =>
					!(
						list.listId === entry.listId &&
						list.showId === entry.showId
					),
			) ?? [];
	}

	async function addToWatchList(
		showTmdbId: TAddToListControls["showTmdbId"],
		type: TAddToListControls["type"],
	) {
		await addToList(showTmdbId, watchList.value.id, type);
	}

	async function removeFromWatchList(
		showTmdbId: TRemoveFromListControls["showTmdbId"],
	) {
		await removeFromList(showTmdbId, watchList.value.id);
	}

	function isShowInList(
		showTmdbId: TShow["tmdbId"] | undefined,
		listId: TList["id"],
	) {
		// If user doesn't have lists || show isn't added to DB || show isn't added to any lists
		if (!hasLists.value || !show.value || !show.value.lists.length) {
			return false;
		}

		return (
			showTmdbId === show.value.tmdbId &&
			show.value.lists.some((list) => list.listId === listId)
		);
	}

	function isInWatchList(showTmdbId: TShow["tmdbId"] | undefined) {
		return isShowInList(showTmdbId, watchList.value.id);
	}

	return {
		lists,
		isLoading,
		addToList,
		addToWatchList,
		removeFromList,
		removeFromWatchList,
		isShowInList,
		isInWatchList,
	};
}
