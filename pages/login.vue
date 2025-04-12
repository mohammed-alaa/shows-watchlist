<script setup lang="ts">
import loginFormSchema from "@schemas/loginForm";

const { isLoading, withLoading } = useLoading();
const { login } = useAuthStore();
const route = useRoute();

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

			navigateTo(
				route.query.next
					? (route.query.next as string)
					: { name: "index" },
			);
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
		<UFormField label="Email" name="email" :error="errors.email">
			<UInput
				placeholder="Enter your email"
				id="email"
				type="email"
				v-model="data.email"
			/>
		</UFormField>

		<UFormField label="Password" name="password" :error="errors.password">
			<UInput
				placeholder="Enter your password"
				id="password"
				type="password"
				v-model="data.password"
			/>
		</UFormField>

		<UButton type="submit" :disabled="isLoading">
			{{ isLoading ? "Loading..." : "Submit" }}
		</UButton>
	</form>
</template>
