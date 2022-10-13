describe('страница Строка работает корректно', function() {
  before(function() {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Кнопка заблокирована когда input пуст', function() {
    cy.get('input').should('have.value', '').then(() => {
    cy.get('button').should('be.disabled')});
  });

  it('Cтрока разворачивается корректно', function(){
    cy.get('input').type('123456');
    cy.contains('Развернуть').click();
    cy.clock();
    cy.get('[data-testid="cyrcle"]').should(($lis) => {
      expect($lis).to.have.length(6)
      expect($lis.eq(0)).to.contain('1').should('have.css', 'border-color', '#0032FF');
      expect($lis.eq(1)).to.contain('2')
      expect($lis.eq(2)).to.contain('3')
      expect($lis.eq(3)).to.contain('4')
      expect($lis.eq(4)).to.contain('5')
      expect($lis.eq(5)).to.contain('6')
    })
    cy.tick(2000);
    cy.get('[data-testid="cyrcle"]').should(($lis) => {
      expect($lis).to.have.length(6)
      expect($lis.eq(0)).to.contain('1').should('have.css', 'border-color', '#D252E1');
      expect($lis.eq(1)).to.contain('2')
      expect($lis.eq(2)).to.contain('3')
      expect($lis.eq(3)).to.contain('4')
      expect($lis.eq(4)).to.contain('5')
      expect($lis.eq(5)).to.contain('6')
    })

})

})