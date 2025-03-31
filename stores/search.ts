import { API_ROUTES } from "@constants";
import searchForm from "@schemas/searchForm";

export const useSearchStore = defineStore("search", () => {
	const page = useState<number>("page", () => 1);
	const totalPages = useState<number>("totalPage", () => 1);
	const results = ref<TSearchTitleDataResponse<TMediaTypes>[]>([]);

	const showPagination = computed(() => totalPages.value > 1);

	const { isLoading, withLoading } = useLoading();
	const { data, submit, errors, hasErrors, setErrors } = useForm({
		schema: searchForm,
		initial: {
			search: "",
		},
		onSuccess: search,
	});

	async function search() {
		try {
			const response = await withLoading(() =>
				$fetch<TSearchByTitleSuccessfulResponse>(
					withApiPrefix(API_ROUTES.SEARCH),
					{
						method: "POST",
						query: {
							page: page.value,
						},
						body: toValue(data),
					},
				),
			);

			totalPages.value = response.total_pages;
			results.value = response.results;
		} catch (error: any) {
			setErrors(error.data.errors);
		}
	}

	async function goToPage(_page: number) {
		if (_page === page.value) {
			return;
		}

		page.value = _page;
		totalPages.value = 1;
		results.value = [];
		await search();
	}

	return {
		data,
		page,
		totalPages,
		results,
		isLoading,
		errors,
		hasErrors,
		showPagination,
		submit,
		goToPage,
	};
});
