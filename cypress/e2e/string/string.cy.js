const colorDefault = Cypress.env("colorDefault");
const colorChanging = Cypress.env("colorChanging");
const colorModifed = Cypress.env("colorModifed");
const styleBorder = Cypress.env("styleBorder");

describe("Cтраница Строка работает корректно", function () {
  before(function () {
    cy.visit("recursion");
  });

  it("Кнопка заблокирована когда input пуст", function () {
    cy.get("input")
      .should("have.value", "")
      .then(() => {
        cy.get("button").should("be.disabled");
      });
  });

  it("Cтрока разворачивается корректно", function () {
    cy.get("input").type("123456");
    cy.contains("Развернуть").click();

    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("1");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis.eq(1)).to.contain("2");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("3");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("4");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("5");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(5)).to.contain("6");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
    });

    cy.wait(1000);

    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("6");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(1)).to.contain("2");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis.eq(2)).to.contain("3");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("4");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("5");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis.eq(5)).to.contain("1");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
    });

    cy.wait(1000);

    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("6");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(1)).to.contain("5");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(2)).to.contain("3");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis.eq(3)).to.contain("4");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorChanging
      );
      expect($lis.eq(4)).to.contain("2");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(5)).to.contain("1");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
    });

    cy.wait(1000);

    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("6");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(1)).to.contain("5");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(2)).to.contain("4");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(3)).to.contain("3");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(4)).to.contain("2");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
      expect($lis.eq(5)).to.contain("1");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorModifed
      );
    });
  });
});
