describe('Register', () => {
    it('register new user successfully', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Cadastrar').click()
        cy.get('input[name="login"]')
            .type('test_user4')
            .should('have.value','test_user4')
            .get('input[name="senha"]')
            .type('123456')
            .should('have.value','123456')
            .get('input[name="email"]')
            .type('test_user4@test.com')
            .should('have.value','test_user4@test.com')
            .get('input[name="nome"]')
            .type('Test User')
            .should('have.value','Test User')
        cy.contains('Cadastrar', ).click()
        cy.contains('Login').should('have.class', 'sc-dkzDqf ksXaKt')
        })
    it('fail to register repeated user', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Cadastrar').click()
            cy.get('input[name="login"]')
                .type('test_user4')
                .should('have.value','test_user4')
                .get('input[name="senha"]')
                .type('123456')
                .should('have.value','123456')
                .get('input[name="email"]')
                .type('test_user4@test.com')
                .should('have.value','test_user4@test.com')
                .get('input[name="nome"]')
                .type('Test User')
                .should('have.value','Test User')
            cy.contains('Cadastrar', ).click()
            cy.contains('Já existe um objeto com esse valor').should('exist', 'sc-jSMfEi gKnknu')
            })
})