---
layout: doc

title: '注册'
description: 注册
---

# {{ $frontmatter.title }}

<form @submit.prevent="handleSubmit" class="search-form">
    <input type="text" placeholder="用户名" v-model="name" />
    <input type="text" placeholder="邮箱" v-model="email" />
    <input type="password" placeholder="密码" v-model="passwd" />
    <input type="password" placeholder="确认密码" v-model="passwd_verify" />
    <button type="submit" :disabled="loading">
        {{ loading ? '提交中...' : '提交' }}
    </button>
</form>
<p v-if="message">{{message}}</p>

<div id="turnstile-container"></div>

<script setup>
import { ref } from 'vue'

import { useTurnstile } from '../vue/utils/useTurnstile.js'

const name = ref('')
const email = ref('')
const passwd = ref('')
const passwd_verify = ref('')

const message = ref('')
const loading = ref(false)

const {// CLOUDFLARE TURNSTILE
    token: turnstileToken,
    CFloading,
    error
} = useTurnstile('0x4AAAAAAGSUy1AZ7yfsf6hK')

async function handleSubmit() {
    message.value = ''
    if (!email.value.trim() || !passwd.value.trim()) return//检测用户是否填了用户名和密码
    if(passwd_verify.value !== passwd.value) {
        message.value = '两次输入的密码不一致'
        return
    }

    loading.value = true//开始让用户等待
    try{
        const res = await fetch('http://localhost:8787/auth/reg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: name.value,
                email: email.value,
                password: passwd.value,
                turnstileToken: turnstileToken.value
            })
        })

        const data = await res.json()//发送数据

        console.log('Register response:', res.status, data)
        message.value = data.error || '註冊完成'

        if (!res.ok) {
            // 后端返回失败数据
            message.value = data.error || '注册失败'
            console.warn(message.value)
            return
        }
        if(res.ok) {
            message.value = '注册成功，请重新登录'
            //后面还有加cookie等操作
        }
    } catch (e) {
        message.value = e || '网络错误，请稍后再试'
        console.error(e)
    } finally {
        loading.value = false
    }
}
</script>
