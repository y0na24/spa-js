import { MenuApi } from './services/MenuApi.js'
import { Router } from './services/Router.js'
import { Store } from './services/Store.js'

// Web Components
import { MenuPage } from './components/MenuPage/MenuPage.js'
import { OrderPage } from './components/OrderPage/OrderPage.js'
import { DetailsPage } from './components/DetailsPage/DetailsPage.js'

window.app = {
	store: new Store(new MenuApi()),
	router: new Router(),
}

window.addEventListener('DOMContentLoaded', async () => {
	const { store, router } = window.app

	router.init()
	await store.setCart()
})
