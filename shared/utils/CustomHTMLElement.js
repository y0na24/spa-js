export class CustomHTMLElement extends HTMLElement {
	createRootWithShadowDomAndAttachCss(cssFileName) {
		const stylesElement = document.createElement('style')

		this.root = this.attachShadow({ mode: 'open' })
		this.root.appendChild(stylesElement)

		this.#attachCss(stylesElement, cssFileName)

		return this.root
	}

	async #attachCss(stylesElement, cssFileName) {
		const response = await fetch(cssFileName)
		const css = await response.text()
		stylesElement.textContent = css
	}


	
}
