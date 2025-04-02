import { AUTH, API_ROUTES } from "@constants";

export const useAuthStore = defineStore("auth", () => {
	const user = useState<TUser | null>("user");

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
				$fetch(API_ROUTES.VALIDATE_SESSION),
			);
			setUser(response);
		} catch (error) {
			cleanUpCredentials();
		}

		return Promise.resolve();
	}

	async function init() {
		if (!import.meta.server) {
			return Promise.resolve();
		}

		const route = useRoute();
		const cookie = useCookie(AUTH.COOKIE_NAME);

		if (!cookie.value) {
			cleanUpCredentials();

			if (isPageProtected(route.name as string)) {
				return navigateTo({
					name: "login",
					query: { next: route.fullPath },
				});
			}
			return Promise.resolve();
		}

		const { data, error } = await withLoading(() =>
			useFetch(API_ROUTES.VALIDATE_SESSION),
		);

		if (error.value) {
			cleanUpCredentials();

			if (isPageProtected(route.name as string)) {
				return navigateTo({
					name: "login",
					query: { next: route.fullPath },
				});
			}
		} else {
			setUser(data.value);
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
