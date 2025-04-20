import { API_ROUTES } from "@constants";

export const useListStore = defineStore("list", () => {
	const lists = useState<TList[]>("list-lists", () => []);

	const { isLoading, withLoading } = useLoading();

	const hasLists = computed(() => lists.value.length > 0);
	const watchList = computed(
		() => lists.value.find((list) => list.isWatchList)!,
	);

	async function createList(payload: TCreateListPayload) {
		const { data } = await $fetch(API_ROUTES.CREATE_LIST, {
			method: "POST",
			body: payload,
		});

		lists.value.push(data);

		return Promise.resolve(data);
	}

	async function retrieveLists() {
		const { data, error } = await useFetch(API_ROUTES.RETRIEVE_LISTS);

		if (error.value) {
		} else {
			lists.value = data.value;
		}

		return Promise.resolve();
	}

	async function deleteList(listId: TList["id"]) {
		if (!hasLists.value) {
			return Promise.reject();
		}

		try {
			await withLoading(() =>
				$fetch<void>(
					substituteRouteParams(API_ROUTES.DELETE_LIST, {
						id: listId,
					}),
					{
						method: "DELETE",
					},
				),
			);

			lists.value = lists.value.filter((list) => list.id !== listId);
		} catch (error) {
			return Promise.reject();
		}
	}

	return {
		lists,
		watchList,
		hasLists,
		createList,
		retrieveLists,
		deleteList,
	};
});
