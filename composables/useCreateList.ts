import createListSchema from "@schemas/createListSchema";

export default function () {
	const { isLoading, withLoading } = useLoading();
	const { createList } = useListStore();

	const { data, errors, hasErrors, submit } = useForm<TCreateListPayload>({
		schema: createListSchema,
		initial: {
			name: "",
		},
		onSuccess: async (data) => {
			await withLoading(() => createList(data));
			navigateTo({ name: "index" });
		},
	});

	return {
		isLoading,
		data,
		errors,
		hasErrors,
		submit,
	};
}
