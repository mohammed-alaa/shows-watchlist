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
			$fetch(withApiPrefix(API_ROUTES.LOGOUT), {
				method: "DELETE",
			}),
		);

		cleanUpCredentials();
		return Promise.resolve();
	}

	async function login(data: TLoginPayload) {
		const response = await $fetch(withApiPrefix(API_ROUTES.LOGIN), {
			method: "POST",
			body: data,
		});

		setUser(response.user!);
		return Promise.resolve();
	}

	async function validate() {
		try {
			const response = await withLoading(() =>
				$fetch(withApiPrefix(API_ROUTES.VALIDATE_SESSION)),
			);
			setUser(response!.user);
		} catch (error) {
			cleanUpCredentials();
		}

		return Promise.resolve();
	}

	async function init() {
		const cookie = useCookie(AUTH.COOKIE_NAME);

		if (!cookie.value) {
			return;
		}

		try {
			const { data } = await withLoading(() =>
				useFetch(withApiPrefix(API_ROUTES.VALIDATE_SESSION)),
			);
			setUser(data.value!.user);
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
