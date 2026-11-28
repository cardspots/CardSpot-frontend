<script setup>
import navList from './nav.vue'
</script>
<template>
	<div class="header">
		<m3e-nav-bar mode="auto">
			<navList />
		</m3e-nav-bar>
	</div>
</template>
<style scoped>
.header {
	z-index: 100;
	top: 0;
	position: sticky;
	transition: all 0.5s ease;
}
</style>
