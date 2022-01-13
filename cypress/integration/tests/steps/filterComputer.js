When(/^click on the button "Filter by name"$/, () => {
    cy.get('[id="searchsubmit"]').as('searchButton')
    cy.get('@searchButton').should('be.visible').and('be.empty').click()
});

Then(/^will be listed computers that match$/, () => {
    cy.get('[id="main"] h1').invoke('text').then((text) => {
        cy.expect(text).to.equal('6 computers found')
    })
});