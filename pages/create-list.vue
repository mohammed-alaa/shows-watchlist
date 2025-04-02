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
		<div class="form-control">
			<label for="name"> What should this list be called? </label>
			<input type="name" id="name" v-model="data.name" />
			<p v-show="errors.name" v-text="errors.name" />
		</div>
		<button type="submit" :disabled="isLoading">
			{{ isLoading ? "Loading..." : "Submit" }}
		</button>
	</form>
</template>
