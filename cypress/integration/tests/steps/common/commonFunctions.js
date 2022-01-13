function setDateOne() {
    const date = require("dayjs")
    var introducedDate = date().format("YYYY-MM-DD")
    return introducedDate
}

function setDateTwo() {
    const date = require("dayjs")
    var discontinuedDate = date().add('10', 'years').format("YYYY-MM-DD")
    return discontinuedDate
}

function confirmationMsg() {
    cy.get('[class="alert-message warning"]').as('confirmationMsg').should('be.visible')
    return
}

export { setDateOne, setDateTwo, confirmationMsg }