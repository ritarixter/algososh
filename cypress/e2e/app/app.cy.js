
  it('Приложение поднялось', function() {
    cy.visit('http://localhost:3000');
  });


describe('Роутинг работает', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('По умолчанию открылась страница со всеми алгоритмами', function() {
    cy.contains('МБОУ');
  });

  it('Переносит на страницу Строка после нажатия на ссылку строка', function() {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
  });

  it('Переносит на страницу Последовательность фибоначчи после нажатия на ссылку фибоначчи', function() {
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('Переносит на страницу Сортировка массива после нажатия на ссылку сортировка массива', function() {
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('Переносит на страницу Стек после нажатия на ссылку стэк', function() {
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
  });

  
  it('Переносит на страницу Очередь после нажатия на ссылку очередь', function() {
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
  });

  it('Переносит на страницу Связный список после нажатия на ссылку связный список', function() {
    cy.get('a[href*="/"]').click();
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
  });

}); 