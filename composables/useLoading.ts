export default function (initialValue: boolean = false) {
	const isLoading = ref(initialValue);

	function start() {
		isLoading.value = true;
	}

	function stop() {
		isLoading.value = false;
	}

	function withLoading<T>(fn: () => Promise<T>) {
		start();

		try {
			return fn();
		} finally {
			stop();
		}
	}

	return {
		isLoading,
		start,
		stop,
		withLoading,
	};
}
