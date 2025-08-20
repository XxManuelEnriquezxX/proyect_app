import * as request from 'supertest';
import { UsersTestSetup } from './users-setup';

describe('Users Module - CREATE Operations (e2e)', () => {
  const setup = new UsersTestSetup();
  let createdUserIds: string[] = [];

  beforeAll(async () => {
    await setup.initialize();
  });

  afterAll(async () => {
    // Limpiar usuarios creados durante las pruebas
    for (const userId of createdUserIds) {
      await setup.prisma.usuarios.delete({ 
        where: { id: userId } 
      }).catch(() => {});
    }
    await setup.cleanup();
  });

  describe('POST /users/Add', () => {
    // CASOS NORMALES
    it('Caso Normal 1: Debería crear un nuevo usuario con todos los campos válidos', async () => {
      const newUser = {
        nombreUsuario: 'newtestuser',
        password: 'password123',
        email: 'newtest@example.com',
        name: 'New',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'User',
        suscripto: true
      };

      const response = await request(setup.app.getHttpServer())
        .post('/users/Add')
        .set('Authorization', `Bearer ${setup.authToken}`)
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nombreUsuario).toEqual(newUser.nombreUsuario);
      expect(response.body.email).toEqual(newUser.email);
      expect(response.body.name).toEqual(newUser.name);

      createdUserIds.push(response.body.id);
    });

    it('Caso Normal 2: Debería crear un usuario con campos mínimos requeridos', async () => {
      const minimalUser = {
        nombreUsuario: 'user',
        password: 'contra123',
        email: 'user@gmail.com.com',
        name: 'User1',
        apellidoPaterno: 'Bolea',
        apellidoMaterno: 'Qua',
        suscripto: false
      };

      const response = await request(setup.app.getHttpServer())
        .post('/users/Add')
        .set('Authorization', `Bearer ${setup.authToken}`)
        .send(minimalUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.suscripto).toBe(false);

      createdUserIds.push(response.body.id);
    });

    // CASOS ANORMALES
    it('Caso Anormal 1: Debería retornar 400 cuando faltan campos obligatorios', async () => {
      const invalidUser = {
        nombreUsuario: '',
        email: 'invalid@example.com'
        // Faltan campos obligatorios: password, name, apellidos
      };

      await request(setup.app.getHttpServer())
        .post('/users/Add')
        .set('Authorization', `Bearer ${setup.authToken}`)
        .send(invalidUser)
        .expect(400);
    });

    it('Caso Anormal 2: Debería retornar error cuando el email es inválido', async () => {
      const userWithInvalidEmail = {
        nombreUsuario: 'usuario-invalido',
        password: 'password123',
        email: 'no es un email',
        name: 'NoValido',
        apellidoPaterno: 'Invalido',
        apellidoMaterno: 'Email',
        suscripto: false
      };

      await request(setup.app.getHttpServer())
        .post('/users/Add')
        .set('Authorization', `Bearer ${setup.authToken}`)
        .send(userWithInvalidEmail)
        .expect(400);
    });
  });
});