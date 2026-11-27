// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

import LocalizedPage from '@/views/LocalizedPage.vue'
import NotFound from '@/views/404.vue'
//路由表
const routes = [
	{ path: '/', component: LocalizedPage, props: { page: 'home' } }, //主页
	{path: '/login', component: LocalizedPage,props:{page:'login'}},
	{path: '/reg', component: LocalizedPage,props:{page:'reg'}},
	{ path: '/about', component: LocalizedPage, props: { page: 'about' } }, //关于我们
	{ path: '/license', component: () => import('@/views/license.vue') }, //使用协议
	{ path: '/@:username', component: () => import('@/views/profile.vue') },
	{ path: '/select', component: () => import('@/views/selectTable.vue') },
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, //404页面
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		if (to.hash) {
			// to.hash 是编码形式，中文 id 必须 decode + getElementById
			// querySelector 不认 '#%E5%AE%89...' 这种编码后的选择器
			const id = decodeURIComponent(to.hash.slice(1))
			const el = document.getElementById(id)
			if (el) return { el, behavior: 'smooth', top: 100 }
			return { top: 0 }
		}
		return { top: 0 }
	},
})

export default router
