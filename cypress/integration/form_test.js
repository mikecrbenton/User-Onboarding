//docs.cypress.io --> commands

describe("Example Test", () => {
     it("Should return true", ()=> {
      // USING CHAI ASSERTION LIBRARY
      expect(true).to.equal(true)
     })
})

describe("Form Input Testing", ()=> {

   beforeEach( ()=> {
      cy.visit("http://localhost:3000")
   })


   it("Finds the Name Input", ()=> {
      // ARRANGE ( Get elements )
      // ACT ( Mimics User Interaction )
      // ASSERT ( Test/Verify)
      cy.get('[data-cy=nameInput]')
        .type("Mike Benton")
        .should("have.value", "Mike Benton")
        .type(" Lambda Student")
        .should("have.value", "Mike Benton Lambda Student")
        .clear();
      cy.contains("Name is Required") 
      
   })

   it("Finds the Email Input", ()=> {
      // ARRANGE ( Get elements )
      // ACT ( Mimics User Interaction )
      // ASSERT ( Test/Verify)
      cy.get('[data-cy=emailInput]')
        .type("mikecrbenton@gmail.com")
        .should("have.value", "mikecrbenton@gmail.com")
        .clear();
      cy.contains("Email is Required") 
      
   })

   it("Finds the Password Input", ()=> {
      // ARRANGE ( Get elements )
      // ACT ( Mimics User Interaction )
      // ASSERT ( Test/Verify)
      cy.get('[data-cy=passwordInput]')
        .type("asdfasdf")
        .should("have.value", "asdfasdf")
       // .clear();
      //cy.contains("Password is Required") 
      
   })

   it("Tests the Select Box", ()=> {
      cy.get('select')
         .select('HTML')
         .should('have.value', 'html')
   })

   it("Select Box Test", () => {
      cy.get('#c-check')
         .check()
      cy.get('#p-check')
         .check()
   })

   it("Terms Check Test" , () => {

      cy.get('[data-cy=checkboxInput]')
        .check()
        .should("be.checked")
      })

   it("Submit Button", () => {
      cy.get('[data-cy=nameInput]')
         .type("Mike Benton")
      cy.get('[data-cy=emailInput]')
         .type("mikecrbenton@gmail.com")
      cy.get('[data-cy=passwordInput]')
         .type("asdfasdf")
      cy.get('[data-cy=checkboxInput]')
         .check()
      cy.get('[data-cy=submitInput]')
         .click()

   })

   it("Submit Form", () => {
      cy.get('#primary-form').submit()
   })


 
})