===============================================================================
INSTRUCCIONES DE EJECUCIÓN - PRUEBA TÉCNICA CYPRESS
===============================================================================

Tecnologías Utilizadas y Versiones Recomendadas:
------------------------------------------------
- Node.js: v18.x o v20.x (LTS)
- Cypress: v13.x o superior
- Sistema Operativo: Windows / macOS / Linux

Paso a paso para reproducir las pruebas:
----------------------------------------
1. Clone este repositorio de GitHub en su máquina local.
2. Abra una terminal de comandos en la ruta raíz del proyecto clonado.
3. Instale todas las dependencias necesarias ejecutando el comando:
   
   npm install

4. Para abrir la interfaz gráfica interactiva de Cypress (Test Runner):
   
   npx cypress open

   - Seleccione "E2E Testing".
   - Elija el navegador de su preferencia (ej. Chrome o Electron).
   - Haga clic sobre cualquiera de las especificaciones de prueba ('flujo_compra.cy.js' o 'api_demoblaze.cy.js') para ver la ejecución visual estructurada.

5. Para ejecutar todas las pruebas en modo consola de fondo (Modo Headless ideal para CI/CD):
   
   npx cypress run