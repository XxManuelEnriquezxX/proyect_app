import * as request from 'supertest';
import { UsersTestSetup } from './users-setup';

describe('Actualizar Operacion (e2e)', () => {
  const setup = new UsersTestSetup();
  let updateTestUserId: string;

  beforeAll(async () => {
    await setup.initialize();
    
    // Crear usuario específico para pruebas de actualización
    const updateTestUser = await setup.prisma.usuarios.create({
      data: {
        nombreUsuario: 'updatetestuser',
        password: await require('bcrypt').hash('password123', 5),
        email: 'updatetest@example.com',
        name: 'Update',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'User',
        suscripto: false
      }
    });
    updateTestUserId = updateTestUser.id;
  });

  afterAll(async () => {
    if (updateTestUserId) {
      await setup.prisma.usuarios.delete({ 
        where: { id: updateTestUserId } 
      }).catch(() => {});
    }
    await setup.cleanup();
  });

  describe('Actualizar usuario', () => {
    // CASOS NORMALES
    it('Caso Normal 1: Debería actualizar datos básicos del usuario', async () => {
      const updateData = {
        name: 'Updated',
        email: 'updated@example.com',
        apellidoPaterno: 'UpdatedPaterno',
        apellidoMaterno: 'UpdatedMaterno'
      };

      const response = await request(setup.app.getHttpServer())
        .put(`/users/UpdateUser/${updateTestUserId}`)
        .set('Authorization', `Bearer ${setup.authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toEqual(updateData.name);
      expect(response.body.email).toEqual(updateData.email);
      expect(response.body.apellidoPaterno).toEqual(updateData.apellidoPaterno);
      expect(response.body.apellidoMaterno).toEqual(updateData.apellidoMaterno);
    });

    it('Caso Normal 2: Debería actualizar parcialmente (solo algunos campos)', async () => {
      const partialUpdate = {
        suscripto: true
      };

      const response = await request(setup.app.getHttpServer())
        .put(`/users/UpdateUser/${updateTestUserId}`)
        .set('Authorization', `Bearer ${setup.authToken}`)
        .send(partialUpdate)
        .expect(200);

      expect(response.body.suscripto).toBe(true);
      // Verificar que otros campos no se modificaron
      expect(response.body.nombreUsuario).toBe('updatetestuser');
    });

    it('Caso Anormal 2: Debería retornar 401 sin autenticación', async () => {
      const updateData = {
        name: 'Inautorizado'
      };

      await request(setup.app.getHttpServer())
        .put(`/users/UpdateUser/${updateTestUserId}`)
        .send(updateData)
        .expect(401);
    });
  });
});