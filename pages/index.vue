<script setup lang="ts">
const { data } = await useFetch("/api/test");
console.log("data", data.value);
</script>

<template>
	<h1>Index Page</h1>
</template>
