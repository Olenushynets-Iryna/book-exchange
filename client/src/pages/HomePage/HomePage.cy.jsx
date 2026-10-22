import HomePage from './HomePage';

describe('HomePage', () => {
  it('shows the page title', () => {
    cy.mount(<HomePage />);
    cy.contains('h1', 'Головна сторінка').should('be.visible');
  });
});
