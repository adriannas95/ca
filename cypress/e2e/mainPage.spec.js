/// <reference types="cypress" />

describe('Logging in and navigating through SauceDemo', () => {
	beforeEach(() => {
		cy.login('standard_user', 'secret_sauce')
		cy.url().should('include', 'inventory.html')
	})

	it('should navigate through the menu', () => {
		cy.get('#react-burger-menu-btn').should('be.visible').click()
		cy.get('.bm-menu-wrap').should('be.visible')
		cy.get('#inventory_sidebar_link').should('have.text', 'All Items')
		cy.get('#about_sidebar_link').should('have.text', 'About')
		cy.get('#logout_sidebar_link').should('have.text', 'Logout')
		cy.get('#reset_sidebar_link').should('have.text', 'Reset App State')
	})

	it('should verify All Items option', () => {
		cy.get('#react-burger-menu-btn').should('be.visible').click()
		cy.get('#inventory_sidebar_link').click()
		cy.get('.inventory_item').as('productThumbnail')
		cy.get('@productThumbnail').should('have.length', 6)
		cy.get('.title').should('have.text', 'Products')
	})

	it('should verify Logout option', () => {
		cy.get('#react-burger-menu-btn').should('be.visible').click()
		cy.get('#logout_sidebar_link').click()
		cy.url().should('include', '/')
		cy.clearCookies()
		cy.clearLocalStorage()
	})

	it('should verify Reset App State option', () => {
		cy.addProductToCart('Sauce Labs Backpack')
		cy.get('#react-burger-menu-btn').should('be.visible').click()
		cy.get('#reset_sidebar_link').click()
		cy.get('.shopping_cart_badge').should('not.exist')
	})

	it('should verify About option', () => {
		cy.get('#react-burger-menu-btn').should('be.visible').click()
		cy.get('#about_sidebar_link').invoke('removeAttr', 'target').click()
		cy.url().should('include', 'https://saucelabs.com')
	})
})
