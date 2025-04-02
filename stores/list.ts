import { API_ROUTES } from "@constants";

export const useListStore = defineStore("list", () => {
	const lists = useState<TList[]>("list-lists", () => []);

	const hasLists = computed(() => lists.value.length > 0);

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
			console.log("getLists", error.value);
		} else {
			lists.value = data.value;
		}

		return Promise.resolve();
	}

	return {
		lists,
		hasLists,
		createList,
		retrieveLists,
	};
});
