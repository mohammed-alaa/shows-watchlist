<script setup lang="ts">
import registerFormSchema from "@schemas/registerForm";

const { isLoading, withLoading } = useLoading();

const { data, errors, submit, setErrors } = useForm<TRegisterPayload>({
	schema: registerFormSchema,
	initial: {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	},
	async onSuccess(data) {
		if (isLoading.value) {
			return;
		}

		try {
			await withLoading(() =>
				$fetch("/api/register", {
					method: "POST",
					body: data,
				}),
			);
			navigateTo({ name: "login" });
		} catch (error: any) {
			setErrors((error.data as TRegisterResponsePayload).errors);
		}
	},
});

useSeoMeta({
	title: "Register",
});

definePageMeta({
	name: "register",
	auth: false,
});
</script>

<template>
	<h1>Register</h1>

	<form method="post" class="flex flex-col gap-4" @submit.prevent="submit">
		<UFormField label="Name" name="name" :error="errors.name">
			<UInput
				placeholder="Enter your name"
				id="name"
				type="text"
				v-model="data.name"
			/>
		</UFormField>

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

		<UFormField
			label="Confirm Password"
			name="confirmPassword"
			:error="errors.confirmPassword"
		>
			<UInput
				placeholder="Enter your password again"
				id="confirmPassword"
				type="confirmPassword"
				v-model="data.confirmPassword"
			/>
		</UFormField>

		<UButton type="submit" :disabled="isLoading">
			{{ isLoading ? "Loading..." : "Submit" }}
		</UButton>
	</form>
</template>
