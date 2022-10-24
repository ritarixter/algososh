const colorDefault = Cypress.env("colorDefault");
const colorChanging = Cypress.env("colorChanging");
const colorModifed = Cypress.env("colorModifed");
const styleBorder = Cypress.env("styleBorder");

describe("Cтраница Очередь работает корректно", function () {
  before(function () {
    cy.visit("queue");
  });

  it("Кнопка заблокирована когда input пуст", function () {
    cy.get("input")
      .should("have.value", "")
      .then(() => {
        cy.contains("Добавить").should("be.disabled");
      });
  });

  it("Элементы в очередь добавляются корректно", function () {
    cy.get("input").type("3");
    cy.contains("Добавить").click();
    cy.wait(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(7);
      expect($lis.eq(0)).to.contain("3");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      cy.wait(500);
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });

    cy.get("input").type("5");
    cy.contains("Добавить").click();
    cy.wait(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis).to.have.length(7);
      expect($lis.eq(1)).to.contain("5");
      cy.wait(500);
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });

    cy.get("input").type("10");
    cy.contains("Добавить").click();
    cy.wait(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis).to.have.length(7);
      expect($lis.eq(2)).to.contain("10");
      cy.wait(500);
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Элементы в очереди удаляются корректно", function () {
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(7);
      expect($lis.eq(2)).to.contain("10");
    });

    cy.contains("Удалить").click();
    cy.wait(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis.eq(0)).to.contain("");
      cy.wait(500);
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Кнопка очистить работает корректно", function () {
    cy.contains("Очистить").click();
    cy.wait(1000);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis.eq(0)).to.contain("");
      expect($lis.eq(1)).to.contain("");
      expect($lis.eq(2)).to.contain("");
      expect($lis.eq(3)).to.contain("");
      expect($lis.eq(4)).to.contain("");
      expect($lis.eq(5)).to.contain("");
      expect($lis.eq(6)).to.contain("");
    });
  });
});
