<script setup lang="ts">
defineProps<{
	text: string;
}>();
</script>

<template>
	<div class="border rounded-md py-1 px-2 border-gray-300 w-fit">
		<p>{{ text }}</p>
	</div>
</template>
