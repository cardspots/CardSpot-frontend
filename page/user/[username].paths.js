export default {
  async paths() {
    const res = await fetch(
      'https://cardspot-server.hosinoeiji.workers.dev/sys/routesName'
    )

    if (!res.ok) {
      throw new Error(`取得使用者列表失敗：HTTP ${res.status}`)
    }

    const usernames = await res.json()

    const paths = usernames.map((username) => ({
      params: {
        username: username.name,
      },
    }))

    return paths
  },
}