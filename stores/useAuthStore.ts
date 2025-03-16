const STORAGE_TOKEN_KEY_NAME = "token";

export default defineStore("auth", () => {
	const token = ref<string | null>(null);
	const user = ref<TUser | null>(null);

	const isUserLoggedIn = computed(() => !!token.value);

	async function logout() {
		if (!isUserLoggedIn.value) {
			return Promise.resolve();
		}

		await $fetch("/api/logout", {
			method: "DELETE",
			headers: {
				Authorization: token.value!,
			},
		});

		token.value = null;
		user.value = null;
		localStorage.removeItem(STORAGE_TOKEN_KEY_NAME);
		return Promise.resolve();
	}

	async function login(data: TLoginPayload) {
		const response = await $fetch("/api/login", {
			method: "POST",
			body: data,
		});

		token.value = response.authToken!;
		user.value = response.user!;
		localStorage.setItem(STORAGE_TOKEN_KEY_NAME, token.value);
		return Promise.resolve();
	}


	return {
		user,
		isUserLoggedIn,

		logout,
		login,
		readTokenFromStorageIfExists,
	};
});
