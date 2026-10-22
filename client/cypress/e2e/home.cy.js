describe('Home page', () => {
  it('opens the site and shows the title', () => {
    cy.visit('/');
    cy.contains('h1', 'Головна сторінка').should('be.visible');
  });
});
