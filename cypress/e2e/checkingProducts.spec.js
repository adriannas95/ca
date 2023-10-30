/// <reference types="cypress" />

describe('Checking and filtering products in the inventory page tests as REGULAR USER', () => {
	beforeEach(() => {
		cy.login('standard_user', 'secret_sauce')
		cy.url().should('include', 'inventory.html')
	})

	it('should go to the inventory page and check all products', () => {
		cy.get('.inventory_item').as('productThumbnail')
		cy.get('@productThumbnail').should('have.length', 6)
		cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should(
			'have.text',
			'Add to cart'
		)
	})

	it('should sum prices of all products', () => {
		cy.get('.inventory_item')
			.find('.inventory_item_price')
			.invoke('text')
			.as('itemPrice')

		sumTotalPrice()
	})

	it('should filter products ', () => {
		cy.get('[data-test="product_sort_container"]').should('be.visible')
		cy.get('select').select('Name (Z to A)')
		cy.get('.inventory_item_name')
			.eq(0)
			.should('have.text', 'Test.allTheThings() T-Shirt (Red)')
	})

	function sumTotalPrice() {
		let itemsTotal = 0
		cy.get('@itemPrice').then($linkText => {
			let itemsPriceTotal = 0
			let itemPrice = $linkText.split('$')

			for (let i = 0; i < itemPrice.length; i++) {
				cy.log(itemPrice[i])
				itemsPriceTotal += Number(itemPrice[i])
			}
			itemsTotal += itemsPriceTotal
			cy.log('Inventory items total: ' + itemsPriceTotal)
		})
	}
})
