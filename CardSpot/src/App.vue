<script setup>

//頂部欄和底部欄
import Headers from './components/Headers.vue'
import Foot from './components/Footer.vue'
import setting from './components/setting.vue';

import { onMounted } from 'vue';
import { BgColor, Schemes, CONTRAST } from './utils/setting.js'//设置项目
import "@m3e/web/theme"


onMounted(() => {
    if (import.meta.env.DEV) {
        document.title = 'Develop | MTF.LGBT'
    }
    if (import.meta.env.PROD) {
        document.title = `MTF.LGBT`
    }
});

</script>

<template>
    <m3e-theme :color="BgColor" :scheme="Schemes" :contrast="CONTRAST">
		<setting ref="colorSetRef"/>
		<Headers />
		<main class="content" :style="mainStyle">
			<div><router-view /></div>
		</main>
		<Foot />
    </m3e-theme>
</template>

<style scoped>
.content {
    /* 自動撐開，佔滿剩餘空間，將 Footer 推到底部 */
    flex: 1;
    display: flex;
	flex-direction: column;
    margin: 0 auto;
    width: 90%;
}
</style>