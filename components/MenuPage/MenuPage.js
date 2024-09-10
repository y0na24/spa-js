import { CustomHTMLElement } from '../../shared/utils/CustomHTMLElement.js'

export class MenuPage extends CustomHTMLElement {
	connectedCallback() {
		const template = document.getElementById('menu-page-template')
		const content = template.content.cloneNode(true)
		const root = this.createRootWithShadowDomAndAttachCss(
			'/components/MenuPage/MenuPage.css'
		)

		root.appendChild(content)
	}
}

customElements.define('menu-page', MenuPage)
