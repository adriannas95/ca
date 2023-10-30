const { defineConfig } = require('cypress')

module.exports = defineConfig({
	includeShadowDom: true,
	chromeWebSecurity: false,

	e2e: {
		baseUrl: 'https://www.saucedemo.com',

		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.js')(on, config)
		},

		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
	},
})
