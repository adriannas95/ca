import { WRONG_CREDENTIALS_ERROR, LOCKED_USER_ERROR } from '../e2e/constants'

Cypress.Commands.add('login', (username, password) => {
	cy.visit('/')
	cy.get('.login_wrapper-inner').should('be.visible')
	cy.get('[data-test="username"]').type(username)
	cy.get('[data-test="password"]').type(password)
	cy.get('[data-test="login-button"]').should('be.visible').click()
})

Cypress.Commands.add('loginFail', (username, password) => {
	cy.visit('/')
	cy.get('.login_wrapper-inner').should('be.visible')
	cy.get('[data-test="username"]').type(username)
	cy.get('[data-test="password"]').type(password)
	cy.get('[data-test="login-button"]').should('be.visible').click()
	cy.get('[data-test="error"]')
		.should('be.visible')
		.should('have.text', WRONG_CREDENTIALS_ERROR)
})

Cypress.Commands.add('loginLocked', (username, password) => {
	cy.visit('/')
	cy.get('.login_wrapper-inner').should('be.visible')
	cy.get('[data-test="username"]').type(username)
	cy.get('[data-test="password"]').type(password)
	cy.get('[data-test="login-button"]').should('be.visible').click()
	cy.get('[data-test="error"]')
		.should('be.visible')
		.should('have.text', LOCKED_USER_ERROR)
})

Cypress.Commands.add('addProductToCart', productName => {
	cy.get('.inventory_item_name').each($el => {
		if ($el.text() === productName) {
			cy.log($el.text())
			cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
			cy.get('.shopping_cart_badge').should('be.visible')
			cy.get('[data-test="remove-sauce-labs-backpack"]').should(
				'have.text',
				'Remove'
			)
		}
	})
})

Cypress.Commands.add('verifyCart', productName => {
	cy.get('.shopping_cart_link').click()
	cy.get('.title').should('have.text', 'Your Cart')
	cy.get('.inventory_item_name').should('contain', productName)
})

Cypress.Commands.add('checkoutInfo', (firstName, lastName, postalCode) => {

    cy.get('[data-test="checkout"]').should('be.visible').click()  
    cy.get('.title').should('have.text', 'Checkout: Your Information')
    cy.get('.checkout_info').should('be.visible')
    cy.get('[data-test="firstName"').type(firstName)
    cy.get('[data-test="lastName"').type(lastName)
    cy.get('[data-test="postalCode"').type(postalCode)
    cy.get('[data-test="continue"]').click()

}); 

Cypress.Commands.add('checkoutOverview', productName => {
	cy.get('.title').should('have.text', 'Checkout: Overview')
	cy.get('#checkout_summary_container').should('be.visible')
	cy.get('.inventory_item_name').should('contain', productName)
	cy.get('.summary_info')
		.should('be.visible')
		.should('contain', 'Payment Information')
		.should('contain', 'Shipping Information')
		.should('contain', 'Price Total')
	cy.get('.summary_total_label').should('be.visible')
})
