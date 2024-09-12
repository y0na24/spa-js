export class ProductItem extends HTMLElement {
	connectedCallback() {
		const template = document.getElementById('product-item-template')
		const content = template.content.cloneNode(true)

		this.appendChild(content)

		const product = JSON.parse(this.dataset.product)
		this.querySelector('h4').textContent = product.name
		this.querySelector('p.price').textContent = `$${product.price.toFixed(2)}`
		this.querySelector('img').src = `data/images/${product.image}`
		this.querySelector('a').addEventListener('click', async event => {
			if (event.target.tagName.toLowerCase() == 'button') {
				await STORE.addToCart(product.id)
			} else {
				ROUTER.go(`/product-${product.id}`)
			}
			event.preventDefault()
		})
	}
}

customElements.define('product-item', ProductItem)
