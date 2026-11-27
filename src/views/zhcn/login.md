# 登录

<form @submit.prevent="handleSubmit" class="search-form">
    <input type="text" placeholder="邮箱" v-model="email" />
    <input type="password" placeholder="密码" v-model="passwd" />
    <button type="submit" :disabled="loading">
        {{ loading ? '提交中...' : '提交' }}
    </button>
</form>
<p v-if="message">{{message}}</p>

<script setup>
import { ref } from 'vue'

const email = ref('')
const passwd = ref('')

const message = ref('')
const loading = ref(false)

async function handleSubmit() {
    message.value = ''
    if (!email.value.trim() || !passwd.value.trim()) return//检测用户是否填了用户名和密码

    loading.value = true//开始让用户等待
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value,
                password: passwd.value
            })
        })

        const data = await res.json()//发送数据

        if (!res.ok) {
            // 后端返回失败数据
            message.value = data.error || '登录失败'
            console.warn(message.value)
            return
        }
        if(res.ok) {
            message.value = '登录成功，请稍后'
            //后面还有加cookie等操作
        }
    } catch (e) {
        message.value = '网络错误，请稍后再试'
        console.error(e)
    } finally {
        loading.value = false
    }
}
</script>
