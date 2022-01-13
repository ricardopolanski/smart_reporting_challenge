import * as common from "./common/commonFunctions"

var computerName

When(/^the Add a new computer button is clicked$/, () => {
    cy.intercept({
        url: '/computers/new'
    }).as('new')

    cy.get('[id="add"]').as('newComputer').should('be.visible').and('have.css', 'background-color').and('eq', 'rgb(87, 169, 87)')
    cy.get('@newComputer').click()

    cy.wait('@new', {
        timeout: 5000
    }).its('response.statusCode').should('equal', 200)
});

When(/^input the computer specifications and click on the Create this Computer button$/, () => {
    computerName = 'New computer Smart Reporting'

    let introducedDate = common.setDateOne()
    let discontinuedDate = common.setDateTwo()

    cy.get('@computerName').type(computerName).should('have.value', computerName)

    cy.get('@introduced').type(introducedDate, {
        delay: 50
    }).should('have.value', introducedDate)

    cy.get('@discontinued').type(discontinuedDate, {
        delay: 50
    }).should('have.value', discontinuedDate)


    cy.get('@company').select('Thinking Machines')
        .find('option:selected')
        .should('have.text', 'Thinking Machines')
        .and('have.value', 2)

    cy.intercept({
        url: '/computers',
        method: 'POST'
    }).as('redirectConfirmation')

    cy.get('[class="btn primary"]').click()

});

Then(/^a confirmation message will be displayed$/, () => {
    cy.wait('@redirectConfirmation', {
        timeout: 5000
    }).its('response.statusCode').should('equal', 303)

    common.confirmationMsg()
    cy.get('@confirmationMsg').and('have.text', `Done !  Computer ${computerName} has been created`)
    .and('have.css', 'background-color')
    .and('eq', 'rgb(238, 220, 148)')
});