describe('Ejercicio 1: Flujo de Compra Completo en DemoBlaze', () => {
  
  beforeEach(() => {
    // Visitar la página de inicio antes de cada prueba
    cy.visit('https://www.demoblaze.com/');
  });

  it('Debería agregar dos productos, verificar el carrito y finalizar la compra', () => {
    // 1. Agregar el primer producto (ej. Samsung galaxy s6)
    cy.contains('Samsung galaxy s6').click();
    cy.url().should('include', 'prod.html?idp_=1');
    cy.get('.btn-success').contains('Add to cart').click();
    
    // Manejar el alert nativo de confirmación de agregación
   // cy.on('window:alert', (str) => {
   //   expect(str).to.equal('Product added.');
   // });
    
    // Regresar al Home para el segundo producto
    cy.get('#nava').click();

    // 2. Agregar el segundo producto (ej. Nokia lumia 1520)
    cy.contains('Nokia lumia 1520').click();
    cy.url().should('include', 'prod.html?idp_=2');
    cy.get('.btn-success').contains('Add to cart').click();
    
    // 3. Visualizar e ir al Carrito
    cy.get('#cartur').click();
    cy.url().should('include', 'cart.html');
    
    // Validar que existan al menos dos elementos agregados en la tabla del carrito
    cy.get('.success').should('have.length', 2);

    // 4. Completar el formulario de compra
    cy.get('.btn-success').contains('Place Order').click();
    
    // Esperar a que el modal sea visible y rellenar los datos
    cy.get('#orderModal', { timeout: 5000 }).should('be.visible');
    cy.get('#name').type('Raquel Alvarez Sánchez', { delay: 50 });
    cy.get('#country').type('Ecuador');
    cy.get('#city').type('Quito');
    cy.get('#card').type('4555123456789012');
    cy.get('#month').type('12');
    cy.get('#year').type('2028');
    // 5. Finalizar la compra
    cy.get('button').contains('Purchase').click();

    // Verificaciones finales del éxito de la transacción
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.sweet-alert h2').should('have.text', 'Thank you for your purchase!');
    
    // Confirmar y cerrar
    cy.get('.confirm').click();
  });
});