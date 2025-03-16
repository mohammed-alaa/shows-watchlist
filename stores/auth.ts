const STORAGE_TOKEN_KEY_NAME = "token";

export const useAuthStore = defineStore("auth", () => {
	const token = ref<string | null>(null);
	const user = ref<TUser | null>(null);

	const isUserLoggedIn = computed(() => !!token.value);

	const { withLoading, isLoading } = useLoading();

	function cleanUpCredentials() {
		setToken(null);
		setUser(null);
	}

	function setUser(_user: TUser | null) {
		user.value = _user;
	}

	function setToken(_token: string | null) {
		token.value = _token;
		if (_token === null) {
			localStorage.removeItem(STORAGE_TOKEN_KEY_NAME);
		} else {
			localStorage.setItem(STORAGE_TOKEN_KEY_NAME, _token);
		}
	}

	async function logout() {
		if (!isUserLoggedIn.value) {
			return Promise.resolve();
		}

		await withLoading(() =>
			$fetch("/api/logout", {
				method: "DELETE",
				headers: {
					Authorization: token.value!,
				},
			}),
		);

		cleanUpCredentials();
		return Promise.resolve();
	}

	async function login(data: TLoginPayload) {
		const response = await $fetch("/api/login", {
			method: "POST",
			body: data,
		});

		setToken(response.authToken!);
		setUser(response.user!);
		return Promise.resolve();
	}

	function readTokenFromStorageIfExists() {
		return localStorage.getItem(STORAGE_TOKEN_KEY_NAME);
	}

	async function validate() {
		const _token = token.value ?? readTokenFromStorageIfExists();

		if (!_token) {
			return Promise.resolve();
		}
		try {
			const response = await withLoading(() =>
				$fetch("/api/validate-token", {
					headers: {
						Authorization: _token,
					},
				}),
			);
			setUser(response!.user);
			setToken(_token);
		} catch (error) {
			cleanUpCredentials();
		}

		return Promise.resolve();
	}

	async function init() {
		await validate();
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
