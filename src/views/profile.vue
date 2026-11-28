<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
const usernames = ref(null)
const route = useRoute()

const urlEnd = ref('')
async function getMe() {
	try {
		const username = route.params.username
		if (!username) urlEnd.value = ''
		else if (username) urlEnd.value = `/${username}`
		const res = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/profile${urlEnd.value}`,
			{
				method: 'GET',
				credentials: 'include',
			},
		)
		if (!res.ok) {
			throw new Error(`取得使用者列表失敗：HTTP ${res.status}`)
		}

		usernames.value = await res.json()
		console.log(usernames.value)
	} catch (e) {
		console.error(e)
	}
}
onMounted(getMe)
</script>

<template>
	{{ usernames?.userProfile?.name }}
	{{ usernames?.myself }}
</template>
