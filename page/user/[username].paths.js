export default {
	async paths() {
		const res = await fetch('http://localhost:8787/sys/routesName')

		if (!res.ok) {
			throw new Error('取得使用者列表失敗')
		}

		const usernames = await res.json()

		return usernames.map((username) => {
			return {
				params: {
					username: username.name,
				},
			}
		})
	},
}
