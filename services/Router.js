export class Router {
	constructor() {
		if (Router._instance) throw new Error('RouterApi instance already exist')

		Router._instance = this
	}

	init() {
		document.querySelectorAll('a.navlink').forEach(link => {
			link.addEventListener('click', event => {
				event.preventDefault()

				const endpoint = event.target.getAttribute('href')
				this.go(endpoint)
			})
		})

		window.addEventListener('popstate', event => {
			this.go(event.state.route, false)
		})

		this.go(location.pathname)
	}

	go(route, addToHisoty = true) {
		console.log(`Going to ${route}`)

		if (addToHisoty) {
			history.pushState({ route }, '', route)
		}

		const template = this.#getTemplateBaseOnRoute(route)

		if (template) {
			this.#renderTemplate(template)
		}
	}

	#getTemplateBaseOnRoute(route) {
		let pageElement = null

		switch (route) {
			case '/': {
				pageElement = document.createElement('menu-page')
				break
			}

			case '/order': {
				pageElement = document.createElement('order-page')
				break
			}

			default: {
				if (route.startsWith('/product-')) {
					pageElement = document.createElement('details-page')
					const paramId = route.substring(route.lastIndexOf('-') + 1)
					pageElement.dataset.id = paramId
				}
				break
			}
		}

		return pageElement
	}

	#renderTemplate(template) {
		const root = document.querySelector('main')

		root.innerHTML = ''
		root.appendChild(template)
	}
}
