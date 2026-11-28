<script setup>
import '@m3e/web/avatar'
</script>

<template>
	<div class="footerData">
		<div class="left">
			@HosinoNeko - 2026
			<span style="margin-left: 20px"
				><a href="mailto:support@mtf.lgbt">{{
					$t('components.footer.getSupport')
				}}</a></span
			>
		</div>
		<div class="right">
			<a href="https://afdian.com/a/mtf_lgbt" target="_blank">爱发电</a>
			<a href="https://icp.gov.moe/?keyword=20268965" target="_blank"
				>萌ICP备20268965号</a
			>
			<a href="/license">Apache2.0License</a>
		</div>
	</div>
</template>
<style scoped>
footer {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.footerLink > * {
	margin: 0 10px;
}
.footerLink img {
	width: auto;
	vertical-align: middle;
	margin: 0 5px;
	transform: scale(1);
	transition: transform 0.3s ease-in-out;
}
.footerLink img:hover {
	transform: scale(1.4);
}

.footerLink img:not(.my-head) {
	height: 2em; /* ← 补回这条 */
}

@media (prefers-color-scheme: dark) {
	.footerLink img:not(.my-head) {
		filter: invert(100%);
	}
}
/* 强制 light：关掉反色（覆盖上面的媒体查询） */
.light .footerLink img:not(.my-head) {
	filter: none;
}
/* 强制 dark：打开反色 */
.dark .footerLink img:not(.my-head) {
	filter: invert(100%);
}

.my-head {
	border-radius: 50%;
	height: 3.5em;
}

.footerData {
	background-color: #0000000a;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
}
.footerMade {
	text-align: center;
}
.footerMade * {
	margin: 5px;
}
.footerMade img {
	height: 1.5em;
	width: auto;
	vertical-align: middle;
}
.right {
	display: flex;
	align-items: center;
}
.right * {
	margin: 0 5px;
}
</style>
