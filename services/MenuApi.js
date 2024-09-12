import { api } from '../shared/api/HttpClient.js'

export class MenuApi {
	constructor() {
		if (MenuApi._instance) throw new Error('MenuApi instance already exist')

		MenuApi._instance = this
	}

	getMenu(requestConfig = {}) {
		return api.get('/menu.json', requestConfig)
	}
}
