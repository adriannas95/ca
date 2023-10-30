/// <reference types="cypress" />

describe('Logging in with proper and wrong credentials tests', () => {
	it('should go and load the saucedemo main page', () => {
		cy.visit('/')
		cy.get('.login_logo').should('be.visible')
	})

	it('should try to log in with proper credentials', () => {
		cy.login('standard_user', 'secret_sauce')
		cy.url().should('include', 'inventory.html')
	})

	it('should try to log in with wrong credentials', () => {
		cy.loginFail('abc', '123')
		cy.url().should('include', 'https://www.saucedemo.com')
	})

	it('should try to log in as a locked user', () => {
		cy.loginLocked('locked_out_user', 'secret_sauce')
		cy.url().should('include', 'https://www.saucedemo.com')
	})
})
