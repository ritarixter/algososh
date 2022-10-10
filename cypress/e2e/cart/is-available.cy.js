describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open cart page by default', function() {
    cy.contains('МБОУ');
  })})