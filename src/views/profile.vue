<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
const usernames = ref(null)
const route = useRoute()
async function getMe() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/profile/${route.params.username}`
    )
    if (!res.ok) {
      throw new Error(`取得使用者列表失敗：HTTP ${res.status}`)
    }

    usernames.value = await res.json()
    console.log(usernames.value)
}
onMounted(getMe)
</script>

<template>
    {{ usernames?.userProfile?.name }}
</template>