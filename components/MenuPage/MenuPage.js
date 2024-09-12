import { CustomHTMLElement } from '../../shared/utils/CustomHTMLElement.js'

export class MenuPage extends CustomHTMLElement {
	connectedCallback() {
		const template = document.getElementById('menu-page-template')
		const content = template.content.cloneNode(true)
		const root = this.createRootWithShadowDomAndAttachCss(
			'/components/MenuPage/MenuPage.css'
		)

		root.appendChild(content)

		window.addEventListener('APP_MENU_CHANGE', () => {
			return this.#render()
		})

		if (STORE.menu) {
			console.log('render')
			this.#render()
		}
	}

	#clearMenu() {
		this.root.querySelector('#menu').innerHTML = ''
	}

	#render() {
		if (STORE.menu) {
			this.#clearMenu()

			for (const category of STORE.menu) {
				const liCategory = document.createElement('li')

				liCategory.innerHTML = `<h3>${category.name}</h3>
					<ul class='category'>

					</ul>
				`

				category.products.forEach(product => {
					const item = document.createElement('product-item')
					item.dataset.product = JSON.stringify(product)
					liCategory.querySelector('.category').appendChild(item)
				})

				this.root.querySelector('#menu').appendChild(liCategory)
			}
		} else {
			this.root.querySelector('#menu').innerHTML = 'Loading...'
		}
	}
}

customElements.define('menu-page', MenuPage)
