<script setup>
//頂部欄和底部欄
import Headers from './components/Headers.vue'
import navRail from './components/nav-rail.vue'
import Foot from './components/Footer.vue'
import setting from './components/setting.vue'

import { onMounted } from 'vue'
import { BgColor, Schemes, CONTRAST } from './utils/setting.js' //设置项目
import { useDeviceType } from '@/utils/isMobie'
import '@m3e/web/theme'

const { isMobile, isTablet } = useDeviceType()

onMounted(() => {
	if (import.meta.env.DEV) {
		document.title = 'Develop | MTF.LGBT'
	}
	if (import.meta.env.PROD) {
		document.title = `MTF.LGBT`
	}
})
</script>

<template>
	<m3e-theme :color="BgColor" :scheme="Schemes" :contrast="CONTRAST">
		<setting ref="colorSetRef" />
		<div v-if="isMobile" class="header">
			<Headers />
		</div>
		<div class="content">
			<div class="nav-rail" v-if="!isMobile">
				<nav-rail />
			</div>

			<main :style="mainStyle">
				<div><router-view /></div>
			</main>
		</div>
		<Foot />
	</m3e-theme>
</template>

<style scoped>
.content {
	/* 自動撐開，佔滿剩餘空間，將 Footer 推到底部 */
	flex: 1;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	width: 100%;
}
main {
	max-width: 100%;
	padding: 10px;
}
.header,
.nav-rail {
	position: sticky;
}
.nav-rail {
	top: 20px;
	align-self: flex-start;
	height: fit-content;
}
.header {
	top: 0;
}
</style>
