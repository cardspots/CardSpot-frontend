import { ref, onMounted, onBeforeUnmount } from 'vue'

const SCRIPT_URL =
	'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptPromise = null

function loadTurnstile() {
	if (window.turnstile) return Promise.resolve()

	if (scriptPromise) return scriptPromise

	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script')

		script.src = SCRIPT_URL
		script.async = true
		script.defer = true

		script.onload = () => {
			if (window.turnstile) resolve()
			else reject(new Error('Turnstile failed to initialize'))
		}

		script.onerror = () => {
			scriptPromise = null
			reject(new Error('Turnstile script failed to load'))
		}

		document.head.appendChild(script)
	})

	return scriptPromise
}

export function useTurnstile(sitekey) {
	const token = ref('')
	const loading = ref(false)
	const error = ref(null)

	let widgetId = null
	let mounted = true

	onMounted(async () => {
		loading.value = true

		try {
			await loadTurnstile()

			if (!mounted) return

			widgetId = window.turnstile.render('#turnstile-container', {
				sitekey,
				theme: 'auto',
				action: 'register',

				callback: (value) => {
					token.value = value
					error.value = null
				},

				'expired-callback': () => {
					token.value = ''
				},

				'error-callback': () => {
					token.value = ''
					error.value = 'Turnstile verification failed'
				},
			})
		} catch (err) {
			error.value = err.message
		} finally {
			loading.value = false
		}
	})

	onBeforeUnmount(() => {
		mounted = false

		if (widgetId !== null && window.turnstile) {
			window.turnstile.remove(widgetId)
		}
	})

	return {
		token,
		CFloading: loading,
		error,
	}
}
