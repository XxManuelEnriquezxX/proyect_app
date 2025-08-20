import * as request from 'supertest';
import { UsersTestSetup } from './users-setup';

describe('Eliminar Operation (e2e)', () => {
  const setup = new UsersTestSetup();
  let deleteTestUserIds: string[] = [];

  beforeAll(async () => {
    await setup.initialize();
  });

  beforeEach(async () => {
    // Crear usuarios para cada prueba de eliminación
    const userToDelete = await setup.prisma.usuarios.create({
      data: {
        nombreUsuario: `deletetestuser_${Date.now()}`,
        password: await require('bcrypt').hash('password123', 5),
        email: `deletetest_${Date.now()}@example.com`,
        name: 'Delete',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'User',
        suscripto: false
      }
    });
    deleteTestUserIds.push(userToDelete.id);
  });

  afterEach(async () => {
    // Limpiar usuarios que no fueron eliminados en las pruebas
    for (const userId of deleteTestUserIds) {
      await setup.prisma.usuarios.delete({ 
        where: { id: userId } 
      }).catch(() => {});
    }
    deleteTestUserIds = [];
  });

  afterAll(async () => {
    await setup.cleanup();
  });

  describe('Eliminar usuario', () => {
    // CASOS NORMALES
    it('Caso Normal 1: Debería eliminar un usuario existente', async () => {
      const userIdToDelete = deleteTestUserIds[0];

      await request(setup.app.getHttpServer())
        .delete(`/users/${userIdToDelete}`)
        .set('Authorization', `Bearer ${setup.authToken}`)
        .expect(200);

      // Verificar que el usuario fue eliminado
      const deletedUser = await setup.prisma.usuarios.findUnique({
        where: { id: userIdToDelete }
      });
      
      expect(deletedUser).toBeNull();
    });

it('Caso Normal 2: Debería confirmar que el usuario fue eliminado de la base de datos', async () => {
  // 1. Crear un usuario específico para esta prueba
  const additionalUser = await setup.prisma.usuarios.create({
    data: {
      nombreUsuario: `deleteconfirm_${Date.now()}`,
      password: await require('bcrypt').hash('password123', 5),
      email: `confirm_${Date.now()}@example.com`,
      name: 'Confirm',
      apellidoPaterno: 'Delete',
      apellidoMaterno: 'Test',
      suscripto: false
    },
  });
  deleteTestUserIds.push(additionalUser.id);

  await request(setup.app.getHttpServer())
    .delete(`/users/${additionalUser.id}`)
    .set('Authorization', `Bearer ${setup.authToken}`)
    .expect(200);

  // Buscar al usuario en la base de datos
  const deletedUser = await setup.prisma.usuarios.findUnique({
    where: { id: additionalUser.id },
  });

  // Asegurarse de que el resultado de la búsqueda es nulo
  expect(deletedUser).toBeNull();
});

    it('Caso Anormal 1: Debería retornar 401 sin autenticación', async () => {
      const userIdToDelete = deleteTestUserIds[0];

      await request(setup.app.getHttpServer())
        .delete(`/users/${userIdToDelete}`)
        .expect(401);
    });
  });
});
