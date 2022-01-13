import * as common from "./common/commonFunctions"

var computerName



When(/^edit the computer and click on the Save this computer button$/, () => {
    computerName = "New Computer Name"
    cy.get('@computerName').type('{selectall}').type(computerName, {
            delay: 50
        })
        .should('have.value', computerName)

    let introducedDate = common.setDateOne()
    let discontinuedDate = common.setDateTwo()

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
        url: '/computers/331',
        method: 'POST'
    }).as('redirectConfirmation')

    cy.get('[class="btn primary"]').as('savebutton').should('be.visible').click()




});

Then(/^the message Done ! Computer ACE has been updated should be displayed$/, () => {
    cy.wait('@redirectConfirmation', {
        timeout: 5000
    }).its('response.statusCode').should('equal', 303)

    common.confirmationMsg()
    cy.get('@confirmationMsg').and('have.text', `Done !  Computer ${computerName} has been updated`)
        .and('have.css', 'background-color')
        .and('eq', 'rgb(238, 220, 148)')
});