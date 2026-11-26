---
layout: doc

description: 用户
---

<script setup>
    import { onMounted, watch } from 'vue'

    onMounted(() => {
    watch(() => params.value.username,(username) => {
            document.title = `${username} | CardSpot`
        },
        { immediate: true }
    )
    })
</script>

# {{username}}
