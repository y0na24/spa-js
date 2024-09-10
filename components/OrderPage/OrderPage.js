import { CustomHTMLElement } from "../../shared/utils/CustomHTMLElement.js"

export class OrderPage extends CustomHTMLElement {
	connectedCallback() {
		const template = document.getElementById('order-form-template')
		const content = template.content.cloneNode(true)
		const root = this.createRootWithShadowDomAndAttachCss(
			'/components/OrderPage/OrderPage.css'
		)

		root.appendChild(content)
	}
}

customElements.define('order-page', OrderPage)
