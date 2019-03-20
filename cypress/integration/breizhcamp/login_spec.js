describe('Login page', function() {
  // TODO Refactor me to avoid duplication ! 😏
  beforeEach(function() {
    cy.visit('/login')
  })

  function showErrorMessage() {
    cy.contains('email or password is invalid').should('be.visible')
  }

  it('should display nicely', function() {
    cy.contains('Sign In').should('be.visible')
    cy.get('input[type=email]').should('be.visible')
    cy.get('input[type=password]').should('be.visible')
    cy.get('button[type=submit]').should('be.visible')
  })

  it('should display error message when empty email and password are submitted', function() {
    cy.get('button[type=submit]').click()
    showErrorMessage()
  })

  it('should display error message when password is empty', function() {
    cy.get('input[type=email]').type('test@test.com{enter}')
    showErrorMessage()
  })

  it('should display error message when email is empty', function() {
    cy.get('input[type=password]').type('password{enter}')
    showErrorMessage()
  })

  it('should display error message when login failed', function() {
    cy.get('input[type=email]').type('breizh@camp.fr')
    cy.get('input[type=password]').type('wrong{enter}')
    showErrorMessage()
  })

  it('should redirect to homepage when logging is successful', function() {
    cy.get('input[type=email]').type('breizh@camp.fr')
    cy.get('input[type=password]').type('Rennes1234{enter}')
    cy.url().should('contain', '/')
    cy.contains('BreizhCamp').should('be.visible')
  })
})
