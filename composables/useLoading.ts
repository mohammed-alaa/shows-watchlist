export default function (initialValue: boolean = false) {
	const isLoading = ref(initialValue);

	async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
		isLoading.value = true;

		try {
			return await fn();
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		withLoading,
	};
}
