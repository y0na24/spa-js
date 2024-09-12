import { MenuApi } from './services/MenuApi.js'
import { CartApi } from './services/CartApi.js'
import { Router } from './services/Router.js'
import { proxiedStore } from './services/Store.js'

// Web Components
import { MenuPage } from './components/MenuPage/MenuPage.js'
import { OrderPage } from './components/OrderPage/OrderPage.js'
import { DetailsPage } from './components/DetailsPage/DetailsPage.js'
import { ProductItem } from './components/ProductItem/ProductItem.js'
import { CartItem } from './components/CartItem/CartItem.js'

const menuApi = new MenuApi()
const cartApi = new CartApi()

window.STORE = proxiedStore(menuApi)
window.ROUTER = new Router()
window.API = {
	menu: menuApi,
	cart: cartApi,
}

window.addEventListener('DOMContentLoaded', async () => {
	ROUTER.init()
	await STORE.setMenu()
})

window.addEventListener('APP_CART_CHANGE', event => {
	const badge = document.getElementById('badge')
	const qty = STORE.cart.reduce((acc, item) => acc + item.quantity, 0)
	badge.textContent = qty
	badge.hidden = qty === 0
})
