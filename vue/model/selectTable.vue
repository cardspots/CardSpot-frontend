<script setup>
    import { ref, onMounted } from 'vue'

    

    const merchants = ref([])
    const loading = ref(false)
    const error = ref('')

    const city = ref('')
    const district = ref('')
    const address = ref('')
    const verify = ref('')

    async function getMerchants() {
        error.value = ''
        loading.value = true
        try {
            const res = await fetch('http://localhost:8787/sel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    city: city.value,
                    district: district.value,
                    address:address.value,
                    verify:verify.value
                })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            merchants.value = data.merchant.results
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
    //onMounted(getMerchants)
</script>
<template>
    <form @submit.prevent="getMerchants" class="search-form">
        <input type="text" placeholder="城市" v-model="city" />
        <input type="text" placeholder="行政区" v-model="district" />
        <input type="radio" v-model="verify" value="all"/>全部
        <input type="radio" v-model="verify" value="true"/>已认证
        <input type="radio" v-model="verify" value="false"/>未认证
        <button type="submit" :disabled="loading">
            {{ loading ? '提交中...' : '提交' }}
        </button>
    </form>

    <section>
        <p v-if="loading">加载中...</p>
        <p v-else-if="error">{{ error }}</p>
        <table v-else>
            <thead>
                <th>商户名称</th>
                <th>城市</th>
                <th>地址</th>
                <th>标记者</th>
                <th>认证状态</th>
                <th>是否支持自助pos机</th>
            </thead>
            <tbody v-for="merchant in merchants" :key="merchant.id">
                <td>{{merchant.name}}</td>
                <td>{{merchant.city}} {{ merchant.district }}</td>
                <td>{{merchant.address}}</td>
                <td>{{merchant.added_user_name}}</td>
                <td>{{merchant.verify_merchant_user ? '已认证':'未认证'}} {{ merchant.verify_merchant_user }}</td>
                <td>{{merchant.selfService == 1 ? '支持':'不支持'}}</td>
            </tbody>
        </table>
    </section>
</template>