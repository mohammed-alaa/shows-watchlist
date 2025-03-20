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
		setErrors({});

		try {
			await validateScehma<TData>(schema, toValue(data));
			await onSuccess?.(toValue(data));
		} catch (result: any) {
			setErrors(result);
			onError?.(toValue(errors), setErrors);
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
