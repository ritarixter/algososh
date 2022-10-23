const colorDefault = Cypress.env("colorDefault");
const colorChanging = Cypress.env("colorChanging");
const colorModifed = Cypress.env("colorModifed");
const styleBorder = Cypress.env("styleBorder");

describe("Cтраница Связный список работает корректно", function () {
  before(function () {
    cy.visit("list");
  });

  it("Кнопки заблокированы когда input text пуст", function () {
    cy.get('[data-testid="inputText"]')
      .should("have.value", "")
      .then(() => {
        cy.contains("Добавить в head").should("be.disabled");
        cy.contains("Добавить в tail").should("be.disabled");
        cy.contains("Добавить по индексу").should("be.disabled");
        cy.contains("Удалить по индексу").should("be.disabled");
      });
  });

  it("Добавить/удалить по index кнопки заблокированы когда input index пуст", function () {
    cy.get('[data-testid="inputIndex"]')
      .should("have.value", "")
      .then(() => {
        cy.contains("Добавить по индексу").should("be.disabled");
        cy.contains("Удалить по индексу").should("be.disabled");
      });
  });

  it("Корректная отрисовка дефолтного списка", function () {
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(4);
      expect($lis.eq(0)).to.contain("0");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("34");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("8");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("1");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Корректно добавляется элемент в head", function () {
    cy.clock();
    cy.get('[data-testid="inputText"]').type("6");
    cy.contains("Добавить в head").click();
    cy.get('[data-testid="circle"]').should(
      styleBorder.css,
      styleBorder.border,
      colorChanging
    );
    cy.tick(500);
    cy.get('[data-testid="circle"]:first').should(
      styleBorder.css,
      styleBorder.border,
      colorModifed
    );
    cy.get('[data-testid="item"]').contains("head");
    cy.tick(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(5);
      expect($lis.eq(0)).to.contain("6");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("0");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("34");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("8");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("1");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Корректно добавляется элемент в tail", function () {
    cy.clock();
    cy.get('[data-testid="inputText"]').type("11");
    cy.contains("Добавить в tail").click();
    cy.tick(500);
    cy.get('[data-testid="item"]').contains("tail");
    cy.get('[data-testid="circle"]:last').should(
      styleBorder.css,
      styleBorder.border,
      colorModifed
    );
    cy.tick(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("6");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("0");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("34");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("8");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("1");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(5)).to.contain("11");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Корректно добавляется элемент по index", function () {
    cy.clock();
    cy.get('[data-testid="inputText"]').type("9");
    cy.get('[data-testid="inputIndex"]').type("1");
    cy.contains("Добавить по индексу").click();
    cy.tick(500);
    cy.get('[data-testid="circle"]:first').should(
      styleBorder.css,
      styleBorder.border,
      colorChanging
    );
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should(styleBorder.css, styleBorder.border, colorChanging);
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should(styleBorder.css, styleBorder.border, colorModifed);
    cy.tick(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(7);
      expect($lis.eq(0)).to.contain("6");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("9");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("0");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("34");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("8");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(5)).to.contain("1");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(6)).to.contain("11");
      cy.get($lis.eq(6)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Корректно удаляется элемент из head", function () {
    cy.clock();
    cy.contains("Удалить из head").click();
    cy.get('[data-testid="circle"]:first').should(
      styleBorder.css,
      styleBorder.border,
      colorChanging
    );
    cy.tick(500);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("");
      cy.tick(500);
      expect($lis.eq(0)).to.contain("9");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("0");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("34");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("8");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("1");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(5)).to.contain("11");
      cy.get($lis.eq(5)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Корректно удаляется элемент из tail", function () {
    cy.clock();
    cy.contains("Удалить из tail").click();
    cy.get('[data-testid="circle"]')
      .eq(5)
      .should(styleBorder.css, styleBorder.border, colorChanging);
    cy.tick(1000);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(5);
      expect($lis.eq(0)).to.contain("9");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("0");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("34");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("8");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(4)).to.contain("1");
      cy.get($lis.eq(4)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });

  it("Корректно удаляется элемент по index", function () {
    cy.clock();
    cy.get('[data-testid="inputIndex"]').type("1");
    cy.contains("Удалить по индексу").click();
    cy.tick(500);
    cy.get('[data-testid="circle"]:first').should(
      styleBorder.css,
      styleBorder.border,
      colorChanging
    );
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should(styleBorder.css, styleBorder.border, colorChanging);
    cy.tick(1000);
    cy.get('[data-testid="circle"]').within(($lis) => {
      expect($lis).to.have.length(4);
      expect($lis.eq(0)).to.contain("9");
      cy.get($lis.eq(0)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(1)).to.contain("34");
      cy.get($lis.eq(1)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(2)).to.contain("8");
      cy.get($lis.eq(2)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
      expect($lis.eq(3)).to.contain("1");
      cy.get($lis.eq(3)).should(
        styleBorder.css,
        styleBorder.border,
        colorDefault
      );
    });
  });
});
