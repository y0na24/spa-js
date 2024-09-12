import { CustomHTMLElement } from '../../shared/utils/CustomHTMLElement.js'

export class DetailsPage extends CustomHTMLElement {
	connectedCallback() {
		const template = document.getElementById('details-page-template')
		const content = template.content.cloneNode(true)
		const root = this.createRootWithShadowDomAndAttachCss(
			'/components/DetailsPage/DetailsPage.css'
		)
		root.appendChild(content)
		this.renderData()
	}

	async renderData() {
		if (this.dataset.id) {
			this.product = await STORE.getProductById(+this.dataset.id)
			this.root.querySelector('h2').textContent = this.product.name
			this.root.querySelector('img').src = `/data/images/${this.product.image}`
			this.root.querySelector('.description').textContent =
				this.product.description
			this.root.querySelector(
				'.price'
			).textContent = `$ ${this.product.price.toFixed(2)} ea`
			this.root.querySelector('button').addEventListener('click', async () => {
				await STORE.addToCart(this.dataset.id)
				ROUTER.go('/order')
			})
		} else {
			alert('Invalid Product ID')
		}
	}
}

customElements.define('details-page', DetailsPage)
