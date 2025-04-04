import { API_ROUTES } from "@constants";

export const useShowStore = defineStore("show", () => {
	const details = useState<TRetrieveShowDetailsResponse["details"]>(
		"show-details-details",
	);
	const show =
		useState<TRetrieveShowDetailsResponse["show"]>("show-details-show");

	async function getDetails(showTmdbId: TShow["tmdbId"], type: TMediaTypes) {
		const { data, error } = await useFetch<TRetrieveShowDetailsResponse>(
			substituteRouteParams(API_ROUTES.SHOW_DETAILS, {
				type,
				id: showTmdbId,
			}),
			{
				method: "GET",
			},
		);

		if (error.value) {
			console.log("getDetails-errors", error.value);
			return Promise.resolve();
		}

		details.value = data.value!.details;
		show.value = data.value!.show;
		return Promise.resolve();
	}

	return {
		details,
		show,

		getDetails,
	};
});
