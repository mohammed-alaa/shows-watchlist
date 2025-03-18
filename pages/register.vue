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
		<div class="form-control">
			<label for="name"> Name </label>
			<input type="text" id="name" v-model="data.name" />
			<p v-show="errors.name" v-text="errors.name" />
		</div>

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

		<div class="form-control">
			<label for="confirmPassword"> Confirm Password </label>
			<input
				type="password"
				id="confirmPassword"
				v-model="data.confirmPassword"
			/>
			<p
				v-show="errors.confirmPassword"
				v-text="errors.confirmPassword"
			/>
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
