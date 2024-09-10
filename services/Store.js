export class Store {
	#menu = null
	#cart = []
	#api = null

	constructor(api) {
		if (Store._instance) throw new Error('Стор уже создан')

		Store._instance = this
		this.#api = api
	}

	async setCart() {
		this.#cart = await this.#api.getMenu()
	}
}
