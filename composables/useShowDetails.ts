import { API_ROUTES } from "@constants";

export default function (titleId: number, type: TMediaTypes) {
	const details = useState<TShowDetails<TMediaTypes> | null>("show-details");
	const { isLoading, withLoading } = useLoading();

	async function getDetails() {
		try {
			const { data } = await withLoading(() =>
				useFetch<TShowDetails<TMediaTypes>>(
					withApiPrefix(API_ROUTES.SHOW_DETAILS, {
						type,
						id: titleId,
					}),
					{
						method: "GET",
					},
				),
			);

			console.log("data", data.value);
			details.value = data.value;
		} catch (error: any) {
			// setErrors(error.data.errors);
		}
	}

	return {
		type,
		details,
		isLoading,

		getDetails,
	};
}
