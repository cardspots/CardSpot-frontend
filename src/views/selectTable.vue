<script setup>
import { ref, computed } from 'vue'
import { pca } from 'cn-division'

import { useDeviceType } from '@/utils/isMobie'
const { isMobile, isTablet } = useDeviceType()

const mobileStyle = computed(() => ({
	flexDirection: isMobile.value || isTablet.value ? 'column' : 'row',
}))

const merchants = ref([])
const loading = ref(false)
const error = ref('')

const prov = ref('')
const city = ref('')
const district = ref('')
const verify = ref('all')

// 省份列表
const provinces = computed(() => Object.keys(pca))

// 城市列表：选了省才有
const cities = computed(() =>
	prov.value && pca[prov.value] ? Object.keys(pca[prov.value]) : [],
)

// 区县列表：选了市才有
const districts = computed(() =>
	prov.value && city.value && pca[prov.value]?.[city.value]
		? pca[prov.value][city.value]
		: [],
)

function selectProvince(name) {
	prov.value = name
	city.value = '' // 换省清空市
	district.value = '' // 换省清空区
}

function selectCity(name) {
	city.value = name
	district.value = '' // 换市清空区
}

function selectDist(name) {
	district.value = name
}

async function getMerchants() {
	error.value = ''
	//merchants.value = ref([])
	loading.value = true
	try {
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sel`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				prov: prov.value,
				city: city.value,
				district: district.value,
				verify: verify.value,
			}),
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
	<h1>查询商家</h1>
	<form @submit.prevent="getMerchants" class="search-form">
		<div class="prov" :style="mobileStyle">
			<m3e-form-field>
				<label slot="label" for="prov-menu">省份</label>
				<input id="prov-menu" v-model="prov" />
			</m3e-form-field>
			<m3e-autocomplete
				for="prov-menu"
				@change="selectProvince($event.target.value)"
			>
				<m3e-option
					v-for="p in provinces"
					:key="p"
					@click="selectProvince(p)"
				>
					{{ p }}
				</m3e-option>
			</m3e-autocomplete>
			<m3e-form-field>
				<label slot="label" for="city-menu">城市</label>
				<input id="city-menu" v-model="city" />
			</m3e-form-field>
			<m3e-autocomplete
				for="city-menu"
				@change="selectCity($event.target.value)"
			>
				<m3e-option v-for="p in cities" :key="p" @click="selectCity(p)">
					{{ p }}
				</m3e-option>
			</m3e-autocomplete>
			<m3e-form-field>
				<label slot="label" for="dist-menu">县、区</label>
				<input id="dist-menu" v-model="district" />
			</m3e-form-field>
			<m3e-autocomplete
				for="dist-menu"
				@change="selectDist($event.target.value)"
			>
				<m3e-option
					v-for="p in districts"
					:key="p"
					@click="selectDist(p)"
				>
					{{ p }}
				</m3e-option>
			</m3e-autocomplete>
		</div>
		<label for="verify">已认证商家</label>
		<m3e-radio-group id="verify" @change="verify = $event.target.value">
			<label><m3e-radio value="all"></m3e-radio>全部</label>
			<label><m3e-radio value="true"></m3e-radio>已认证</label>
			<label><m3e-radio value="false"></m3e-radio>未认证</label>
		</m3e-radio-group>
		<div class="buttonSumbit">
			<m3e-button
				variant="elevated"
				shape="square"
				type="submit"
				:disabled="loading"
			>
				{{ loading ? '查询中...' : '查询' }}
			</m3e-button>
		</div>
	</form>

	<m3e-content-pane>
		<section class="table-wrapper">
			<p v-if="loading">加载中...</p>
			<!--<p v-else-if="loading == false"></p>-->
			<p v-else-if="error">{{ error }}</p>
			<table v-else>
				<thead>
					<tr>
						<th>商户名称</th>
						<th>城市</th>
						<th>地址</th>
						<th>标记者</th>
						<th>认证状态</th>
						<th>是否支持自助pos机</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="merchant in merchants" :key="merchant.id">
						<td>{{ merchant.name }}</td>
						<td>{{ merchant.city }} {{ merchant.district }}</td>
						<td>{{ merchant.address }}</td>
						<td>{{ merchant.added_user_name }}</td>
						<td>
							{{
								merchant.verify_merchant_user
									? '已认证'
									: '未认证'
							}}
							{{
								merchant.verify_merchant_user
									? merchant.verify_merchant_user
									: ''
							}}
						</td>
						<td>
							{{ merchant.selfService == 1 ? '支持' : '不支持' }}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</m3e-content-pane>
</template>
<style scoped>
.search-form {
	display: flex;
	flex-direction: column;
	padding: 10px;
}
.prov {
	display: flex;
	flex-direction: row;
}
.prov * {
	margin: 0 10px 0 0;
}
.buttonSumbit {
	display: flex;
	flex-direction: row-reverse;
}
.buttonSumbit m3e-button {
	width: 40%;
}

.table-wrapper {
	width: 100%;
	overflow-x: auto;
	/* 可选：让滚动更顺滑 */
	-webkit-overflow-scrolling: touch;
}
.table-wrapper table {
	/* 防止表格被压缩，保持内容宽度 */
	min-width: 100%;
	white-space: nowrap; /* 如需单元格不换行 */
	border-collapse: collapse;

	padding: 10px;
}
.table-wrapper th,
.table-wrapper td {
	border: 1px solid #ddd;
	padding: 8px 12px;
	text-align: center;
	vertical-align: middle;
}
</style>
