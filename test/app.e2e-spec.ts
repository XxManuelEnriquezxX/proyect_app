import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/core/databases/prisma.service';
import * as bcrypt from 'bcrypt';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;
  let testUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    
    await app.init();

    // Crear un usuario de prueba para autenticación
    const hashedPassword = await bcrypt.hash('password123', 5);
    const testUser = await prisma.usuarios.create({
      data: {
        nombreUsuario: 'testuser_e2e',
        password: hashedPassword,
        email: 'teste2e@example.com',
        name: 'Test',
        apellidoPaterno: 'User',
        apellidoMaterno: 'E2E',
        suscripto: false
      }
    });

    testUserId = testUser.id;

    // Obtener token de autenticación
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'testuser_e2e',
        password: 'password123'
      });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    // Limpiar datos de prueba
    await prisma.usuarios.delete({ where: { id: testUserId } });
    await app.close();
  });

  it('GET /users/GetAllUsers - should return all users', () => {
    return request(app.getHttpServer())
      .get('/users/GetAllUsers')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('POST /users/Add - should create a new user', async () => {
    const newUser = {
      nombreUsuario: 'newtestuser',
      password: 'password123',
      email: 'newtest@example.com',
      name: 'New',
      apellidoPaterno: 'Test',
      apellidoMaterno: 'User',
      suscripto: true
    };

    const response = await request(app.getHttpServer())
      .post('/users/Add')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nombreUsuario).toEqual(newUser.nombreUsuario);

    // Limpiar: eliminar el usuario creado
    await prisma.usuarios.delete({ where: { id: response.body.id } });
  });

  it('PUT /users/UpdateUser/:id - should update user', async () => {
    const updateData = {
      name: 'Updated',
      email: 'updated@example.com'
    };

    return request(app.getHttpServer())
      .put(`/users/UpdateUser/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toEqual(updateData.name);
        expect(res.body.email).toEqual(updateData.email);
      });
  });

  // Prueba para el caso anormal: crear usuario con datos inválidos
  it('POST /users/Add - should return 400 for invalid data', () => {
    const invalidUser = {
      // Faltan campos obligatorios
      nombreUsuario: '',
      email: 'invalid-email'
    };

    return request(app.getHttpServer())
      .post('/users/Add')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidUser)
      .expect(400);
  });
});
  