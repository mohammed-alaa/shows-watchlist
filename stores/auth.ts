import { AUTH_COOKIE_NAME, API_ROUTES } from "@constants";

export const useAuthStore = defineStore("auth", () => {
	const user = ref<TUser | null>(null);

	const isUserLoggedIn = computed(() => user.value !== null);

	const { withLoading, isLoading } = useLoading();

	function cleanUpCredentials() {
		setUser(null);
	}

	function setUser(_user: TUser | null) {
		user.value = _user;
	}

	async function logout() {
		if (!isUserLoggedIn.value) {
			return Promise.resolve();
		}

		await withLoading(() =>
			$fetch(API_ROUTES.LOGOUT, {
				method: "DELETE",
			}),
		);

		cleanUpCredentials();
		return Promise.resolve();
	}

	async function login(data: TLoginPayload) {
		const response = await $fetch(API_ROUTES.LOGIN, {
			method: "POST",
			body: data,
		});

		setUser(response.user!);
		return Promise.resolve();
	}

	async function validate() {
		try {
			const response = await withLoading(() =>
				$fetch(API_ROUTES.VALIDATE_TOKEN),
			);
			setUser(response!.user);
		} catch (error) {
			cleanUpCredentials();
		}

		return Promise.resolve();
	}

	async function init() {
		const cookie = useCookie(AUTH_COOKIE_NAME);

		if (!cookie.value) {
			return;
		}

		try {
			const { data } = await withLoading(() =>
				useFetch(API_ROUTES.VALIDATE_TOKEN),
			);
			setUser(data.value.user);
		} catch (error) {
			cleanUpCredentials();
		}

		return Promise.resolve();
	}

	return {
		user,
		isUserLoggedIn,
		isLoading,

		logout,
		login,
		init,
		validate,
	};
});
