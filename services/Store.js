class Store {
	menu = null
	cart = []

	constructor(menuApi) {
		if (Store._instance) throw new Error('Стор уже создан')

		Store._instance = this
		this.menuApi = menuApi
	}

	async setMenu() {
		this.menu = await this.menuApi.getMenu()
	}

	async getProductById(id) {
		if (!this.menu) {
			await this.setMenu()
		}

		for (let c of this.menu) {
			for (let p of c.products) {
				if (p.id === id) {
					return p
				}
			}
		}
		return null
	}

	async addToCart(id) {
		const product = await STORE.getProductById(id)

		const isAlreadyInCart = STORE.cart.find(product => product.product.id === id)

		if (isAlreadyInCart) {
			STORE.cart = STORE.cart.map(p =>
				p.product.id === id ? { ...p, quantity: p.quantity + 1 } : p
			)
		} else {
			STORE.cart = [...STORE.cart, { product, quantity: 1 }]
		}
	}

	async removeProductFromCart(id) {
		const product = await STORE.getProductById(id)

		if (product) {
			STORE.cart = STORE.cart.filter(product => product.product.id !== id)
		}
	}
}

const { dispatchEvent: dispatch } = window
export const proxiedStore = api =>
	new Proxy(new Store(api), {
		set(target, property, value) {
			target[property] = value

			if (property === 'menu') {
				dispatch(new Event('APP_MENU_CHANGE'))
			}

			if (property === 'cart') {
				dispatch(new Event('APP_CART_CHANGE'))
			}

			return true
		},
	})
