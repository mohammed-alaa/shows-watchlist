import { API_ROUTES } from "@constants";

export default function (titleId: number, type: TMediaTypes) {
	const details = useState<TShowDetails<TMediaTypes> | null>(
		"show-details-details",
		() => null,
	);
	// const lists = useState<TList[]>("show-details-lists", () => []);

	async function getDetails() {
		const { data, error } = await useFetch<TShowDetails<TMediaTypes>>(
			substituteRouteParams(API_ROUTES.SHOW_DETAILS, {
				type,
				id: titleId,
			}),
			{
				method: "GET",
			},
		);

		if (error.value) {
			console.log("getDetails-errors", error.value);
			return Promise.resolve();
		}

		details.value = data.value.details;
		// lists.value = data.value.lists;
		// setErrors(error.data.errors);
		return Promise.resolve();
	}

	return {
		type,
		details,

		getDetails,
	};
}
