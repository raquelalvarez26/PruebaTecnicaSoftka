describe('Pruebas de Servicios REST - Demoblaze (Signup & Login)', () => {
  const apiBaseUrl = 'https://api.demoblaze.com';
  
  // Generamos un usuario aleatorio para garantizar que el caso de registro exitoso no falle por duplicados
  const randomSuffix = Math.floor(Math.random() * 100000);
  const newUsername = `cypress_user_${randomSuffix}`;
  const password = 'SafePassword123';

  // Cuenta de prueba que ya sabemos que existirá para forzar el error de duplicado y el login exitoso
  const existingUsername = 'cypress_test_permanent_user_2026';

  // Aseguramos la existencia del usuario permanente antes de correr los flujos correspondientes
  before(() => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/signup`,
      body: {
        username: existingUsername,
        password: password
      },
      failOnStatusCode: false
    });
  });

  // ==========================================
  // SECCIÓN: SIGNUP (REGISTRO)
  // ==========================================

  it('Caso 1: Crear un nuevo usuario de forma exitosa en Signup', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/signup`,
      body: {
        username: newUsername,
        password: password
      }
    }).then((response) => {
      // Captura y verificación de salida
      expect(response.status).to.eq(200);
      expect(response.body).to.be.empty; // La API exitosa de Demoblaze retorna un cuerpo vacío en el signup exitoso
    });
  });

  it('Caso 2: Intentar registrar un usuario que ya existe', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/signup`,
      body: {
        username: existingUsername, // Usuario creado en el hook before
        password: password
      }
    }).then((response) => {
      // Captura y verificación de salida
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errorMessage', 'This user already exist.');
    });
  });

  // ==========================================
  // SECCIÓN: LOGIN (INICIO DE SESIÓN)
  // ==========================================

  it('Caso 3: Inicio de sesión exitoso con credenciales correctas', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/login`,
      body: {
        username: existingUsername,
        password: password
      }
    }).then((response) => {
      // Captura y verificación de salida
      expect(response.status).to.eq(200);
      expect(response.body).to.include('Auth_token:'); // Valida que retorne el token JWT de sesión exitosa
    });
  });

  it('Caso 4: Intento de inicio de sesión fallido por password incorrecto', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/login`,
      body: {
        username: existingUsername,
        password: 'ClaveTotalmenteIncorrecta'
      }
    }).then((response) => {
      // Captura y verificación de salida
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errorMessage', 'Wrong password.');
    });
  });
});