/// <reference types="cypress" />

describe('Adding items to card and proceeding to Shopping Cart', () => {
	beforeEach(() => {
		cy.login('standard_user', 'secret_sauce')
		cy.url().should('include', 'inventory.html')
	})

	it('should go to the inventory page and add a product to the cart', () => {
		cy.get('.shopping_cart_container').should('be.visible')
		cy.addProductToCart('Sauce Labs Backpack')
	})

	it('should verify added product on the cart page ', () => {
		cy.get('.shopping_cart_container').should('be.visible')
		cy.addProductToCart('Sauce Labs Backpack')
		cy.verifyCart('Sauce Labs Backpack')
	})

	it('should proceed to checkout ', () => {
		cy.get('.shopping_cart_container').should('be.visible')
		cy.addProductToCart('Sauce Labs Backpack')
		cy.verifyCart('Sauce Labs Backpack')

		cy.checkoutInfo('abc','cdf', '123' )

		cy.checkoutOverview('Sauce Labs Backpack')

		cy.get('[data-test="finish"]').click()
		cy.get('.title').should('have.text', 'Checkout: Complete!')
		cy.get('#checkout_complete_container').should('be.visible')
		cy.get('[data-test="back-to-products"]').click()
		cy.get('.shopping_cart_badge').should('not.exist')
	})
})
