import { CustomHTMLElement } from '../../shared/utils/CustomHTMLElement.js'

export class OrderPage extends CustomHTMLElement {
	connectedCallback() {
		const root = this.createRootWithShadowDomAndAttachCss(
			'/components/OrderPage/OrderPage.css'
		)
		const section = document.createElement('section')

		root.appendChild(section)

		window.addEventListener('appcartchange', () => {
			this.render()
		})

		this.render()
	}

	render() {
		let section = this.root.querySelector('section')
		if (STORE.cart.length == 0) {
			section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `
		} else {
			let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `
			section.innerHTML = html

			const template = document.getElementById('order-form-template')
			const content = template.content.cloneNode(true)
			section.appendChild(content)

			let total = 0
			for (let prodInCart of STORE.cart) {
				const item = document.createElement('cart-item')
				item.dataset.item = JSON.stringify(prodInCart)
				this.root.querySelector('ul').appendChild(item)

				total += prodInCart.quantity * prodInCart.product.price
			}
			this.root.querySelector('ul').innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `
		}
	}
}

customElements.define('order-page', OrderPage)
