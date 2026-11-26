---
layout: doc

description: 用户
---

<script setup>
    import { useData } from 'vitepress'
    import { watchEffect } from 'vue'
    const { params } = useData()
    const username = params.value.username
    watchEffect(() => {
        document.title = `${params.value.username} | CardSpot`
    })
</script>

# {{username}}
