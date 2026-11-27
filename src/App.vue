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
        <div class="fixed-element">
            <m3e-fab variant="primary">
                <m3e-icon name="add"></m3e-icon>
            </m3e-fab>
        </div>
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
.fixed-element {
  position: fixed;
  bottom: 40px;       /* 距视口顶部 */
  right: 40px;     /* 距视口右侧 */
  z-index: 1000;   /* 确保不被其他内容盖住 */
}
</style>