const colorDefault = Cypress.env("colorDefault");
const colorChanging = Cypress.env("colorChanging");
const colorModifed = Cypress.env("colorModifed");
const styleBorder = Cypress.env("styleBorder");

describe("Cтраница Стек работает корректно", function () {
  before(function () {
    cy.visit("stack");
  });

  it("Кнопка заблокирована когда input пуст", function () {
    cy.get("input")
      .should("have.value", "")
      .then(() => {
        cy.get('[data-testid="addButton"]').should("be.disabled");
      });
  });

  it("Элементы в стек добавляются корректно", function () {
    cy.get("input").type("3");
    cy.contains("Добавить").click();
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(1);
      expect($lis.eq(0)).to.contain("3");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      cy.wait(1000);
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });

    cy.get("input").type("5");
    cy.contains("Добавить").click();
    cy.get('[data-testid="circle"]').within(($lis) => {
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis).to.have.length(2);
      expect($lis.eq(1)).to.contain("5");
      cy.wait(1000);
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });

    cy.get("input").type("10");
    cy.contains("Добавить").click();
    cy.get('[data-testid="circle"]').within(($lis) => {
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis).to.have.length(3);
      expect($lis.eq(2)).to.contain("10");
      cy.wait(1000);
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Элементы в стеке удаляются корректно", function () {
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(2)).to.contain("10");
    });

    cy.contains("Удалить").click();
    cy.wait(1000);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(2);
    });
  });

  it("Кнопка очистить работает корректно", function () {
    cy.get("input").type("6");
    cy.contains("Добавить").click();
    cy.contains("Очистить").click();
    cy.wait(1000);
    cy.get('[data-testid="circle"]').should("length", "0");
  });
});
