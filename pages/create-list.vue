<script setup lang="ts">
const { data, isLoading, errors, hasErrors, submit } = useCreateList();

definePageMeta({
	name: "create-list",
});

useSeoMeta({
	title: "Create List",
});
</script>

<template>
	<h1>Create List</h1>

	<form @submit.prevent="submit">
		<UFormField
			label="What should this list be called?"
			name="name"
			:error="errors.name"
		>
			<UInput
				placeholder="Enter list name"
				id="name"
				type="text"
				v-model="data.name"
			/>
		</UFormField>
		<UButton type="submit" :disabled="isLoading">
			{{ isLoading ? "Loading..." : "Submit" }}
		</UButton>
	</form>
</template>
