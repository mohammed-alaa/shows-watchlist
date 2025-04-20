import { API_ROUTES } from "@constants";

export default function (listId: number) {
	const list = useState<TListWithShows["list"]>("list-details");
	const shows = useState<TListWithShows["shows"]>("list-details-shows");

	const listStore = useListStore();

	async function getDetails(): Promise<void> {
		const { data, error } = await useFetch<TListWithShows>(
			substituteRouteParams(API_ROUTES.LIST_DETAILS, {
				id: listId,
			}),
		);

		if (error.value) {
			console.log("getDetails", error.value);
			return Promise.resolve();
		}

		list.value = data.value!.list;
		shows.value = data.value!.shows;
		return Promise.resolve();
	}

	async function deleteList(listId: number): Promise<void> {
		try {
			await listStore.deleteList(listId);
			shows.value = [];
		} catch (error) {}
	}

	return {
		list,
		shows,
		getDetails,
		deleteList,
	};
}
