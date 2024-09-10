export class HttpClient {
	#baseUrl = null
	#token = null

	constructor(baseUrl) {
		if (HttpClient._instance) throw new Error('HttpClient already exists')

		if (typeof baseUrl === 'string') {
			HttpClient._instance = this
			this.#baseUrl = baseUrl
		}
	}

	setToken(newToken) {
		this.#token = newToken
	}

	createSearchParams(params) {
		const searchParams = new URLSearchParams()

		for (const key in params) {
			if (Object.prototype.hasOwnProperty(params, key)) {
				const value = params[key]

				if (Array.isArray(value)) {
					value.forEach(currentValue => searchParams.append(key, currentValue))
				} else {
					searchParams.set(key, value)
				}
			}
		}

		return `?${searchParams.toString()}`
	}

	async #request(endpoint, method, options) {
		console.info('REQUEST:', method, endpoint, new Date())

		let url = `${this.#baseUrl}/${endpoint}`

		if (options.params) {
			url += this.createSearchParams(options.params)
		}

		const config = {
			...options,
			url: endpoint,
			method,
			headers: {
				...(!!options.headers && options.headers),
				...(!!this.#token && { Authorization: `Bearer ${this.#token}` }),
			},
		}

		const response = await fetch(url, config)

		return {
			success: response.ok,
			status: response.status,
			statusText: response.statusText,
			data: await response.json(),
		}
	}

	get(endpoint, options) {
		return this.#request(endpoint, 'GET', options)
	}

	delete(endpoint, options) {
		return this.#request(endpoint, 'DELETE', options)
	}

	post(endpoint, body, options) {
		return this.#request(endpoint, 'POST', {
			...options,
			...(!!body && { body: JSON.stringify(body) }),
		})
	}

	put(endpoint, body, options) {
		return this.#request(endpoint, 'PUT', {
			...options,
			...(!!body && { body: JSON.stringify(body) }),
		})
	}

	patch(endpoint, body, options) {
		return this.#request(endpoint, 'PATCH', {
			...options,
			...(!!body && { body: JSON.stringify(body) }),
		})
	}
}

export const api = new HttpClient('https://jsonplaceholder.typicode.com')
