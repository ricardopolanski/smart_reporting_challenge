import * as common from "./common/commonFunctions"

When(/^click on the Delete This Computer button$/, () => {
	cy.get('[class="btn danger"]').as('deleteBtn').should('be.visible').click()
});

Then(/^a delete confirmation message will be displayed$/, () => {
	common.confirmationMsg()
    cy.get('@confirmationMsg').and('have.text', `Done !  Computer Acer Extensa 5220 has been deleted`)
        .and('have.css', 'background-color')
        .and('eq', 'rgb(238, 220, 148)')
});
