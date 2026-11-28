<script setup>
import navList from './nav.vue'
</script>

<template>
	<m3e-nav-rail id="nav-rail">
		<m3e-icon-button toggle>
			<m3e-icon name="menu"></m3e-icon>
			<m3e-icon slot="selected" name="menu_open"></m3e-icon>
			<m3e-nav-rail-toggle for="nav-rail"></m3e-nav-rail-toggle>
		</m3e-icon-button>
		<m3e-fab size="small">
			<m3e-icon name="edit"></m3e-icon>
			<span slot="label">Extended</span>
		</m3e-fab>
		<navList />
	</m3e-nav-rail>
</template>
