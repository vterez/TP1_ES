describe('Testes de Sistema', () => {

    before(() => {
        cy.visit('http://localhost:3000');

      });
    
    
    it('loads successfully', () => {


        cy.request('POST', '/login', {
        login: 'teste',
        senha: 'abc123',
    
    }).as('post')
    })
})


