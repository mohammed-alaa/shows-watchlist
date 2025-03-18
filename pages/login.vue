<script setup lang="ts">
import loginFormSchema from "@schemas/loginForm";

const { isLoading, withLoading } = useLoading();
const { login } = useAuthStore();

const { data, errors, submit, setErrors } = useForm<TLoginPayload>({
	schema: loginFormSchema,
	initial: {
		email: "",
		password: "",
	},
	async onSuccess(data) {
		if (isLoading.value) {
			return;
		}

		try {
			await withLoading(() => login(data));
			navigateTo({ name: "index" });
		} catch (error: any) {
			setErrors((error.data as TLoginResponsePayload).errors!);
		}
	},
});

useSeoMeta({
	title: "Login",
});

definePageMeta({
	name: "login",
	auth: false,
});
</script>

<template>
	<h1>Login</h1>

	<form method="post" class="flex flex-col gap-4" @submit.prevent="submit">
		<div class="form-control">
			<label for="email"> Email </label>
			<input type="email" id="email" v-model="data.email" />
			<p v-show="errors.email" v-text="errors.email" />
		</div>

		<div class="form-control">
			<label for="password"> Password </label>
			<input type="password" id="password" v-model="data.password" />
			<p v-show="errors.password" v-text="errors.password" />
		</div>

		<button type="submit" :disabled="isLoading">
			{{ isLoading ? "Loading..." : "Submit" }}
		</button>
	</form>
</template>

<style scoped>
.form-control {
	@apply flex flex-col gap-2;
}

label[for] {
	@apply cursor-pointer;
}

input {
	@apply px-2 py-1 border border-gray-500 rounded;
}
</style>
