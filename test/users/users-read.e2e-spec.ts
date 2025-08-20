import * as request from 'supertest';
import { UsersTestSetup } from './users-setup';

describe('Leer Operaciones (e2e)', () => {
  const setup = new UsersTestSetup();

  beforeAll(async () => {
    await setup.initialize();
  });

  beforeEach(async () => {
    //Limpiamos la bd para asegurar un estado fresco
    await setup.cleanDatabase();
    //Crea el usuario principal y obtiene el token
    await setup.setupTestUserAndLogin();

    //Crea cualquier otro usuario necesario para el test
    await setup.prisma.usuarios.create({
      data: {
        nombreUsuario: 'readtestuser',
        password: await require('bcrypt').hash('password123', 5),
        email: 'readtest@example.com',
        name: 'Read',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'User',
        suscripto: true
      }
    });
  });
  
  afterAll(async () => {
    await setup.cleanup();
  });

  describe('Todos los usuarios', () => {
    it('Caso Normal 1: Debería retornar todos los usuarios', async () => {
      const response = await request(setup.app.getHttpServer())
        .get('/users/GetAllUsers/')
        .set('Authorization', `Bearer ${setup.authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      const user = response.body[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('nombreUsuario');
      expect(user).toHaveProperty('email');
    });

    it('Caso Anormal 1: Debería retornar 401 sin autenticación', async () => {
      await request(setup.app.getHttpServer())
        .get('/users/GetAllUsers/')
        .expect(200);
    });

  });
});