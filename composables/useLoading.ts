export default function (initialValue: boolean = false) {
	const isLoading = ref(initialValue);

	function withLoading<T>(fn: () => Promise<T>) {
		isLoading.value = true;

		try {
			return fn();
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		withLoading,
	};
}
