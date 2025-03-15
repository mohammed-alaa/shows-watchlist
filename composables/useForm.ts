import type { ZodSchema } from "zod";

type TErrors<TData> = Partial<TData>;

interface TOptions<TData> {
	schema: ZodSchema;
	initial: TData;
	onSuccess?: (data: TData) => Promise<void> | void;
	onError?: (
		error: TErrors<TData>,
		setErrors: (error: TErrors<TData>) => void,
	) => void;
}

export default function <TData extends Record<string, any>>({
	schema,
	initial,
	onSuccess,
	onError,
}: TOptions<TData>) {
	const data = reactive<TData>(initial);
	const errors = ref<TErrors<TData>>({});

	const hasErrors = computed(() => Object.keys(errors.value).length > 0);

	async function submit() {
		errors.value = {};

		const result = await validateScehma<TData>(schema, toValue(data));

		if (result !== null) {
			errors.value = result;
		}

		if (hasErrors.value) {
			onError?.(toValue(errors), setErrors);
		} else {
			await onSuccess?.(toValue(data));
		}
	}

	function setErrors(_errors: TErrors<TData>) {
		errors.value = _errors;
	}

	return {
		data,
		errors,

		hasErrors,

		submit,
		setErrors,
	};
}
