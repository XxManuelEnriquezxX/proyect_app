import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Grupo - Crear (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;

  const usuarioTest = {
    nombreUsuario: 'tesCristhian',
    password: 'cristhian123',
    email: 'test' + Date.now() + '@correo.com',
    name: 'Nombre',
    apellidoPaterno: 'ApellidoP',
    apellidoMaterno: 'ApellidoM',
    suscripto: true
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const registroResponse = await request(app.getHttpServer())
      .post('/users/Add')
      .send(usuarioTest);

    expect(registroResponse.status).toBe(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        nombreUsuario: usuarioTest.nombreUsuario,
        password: usuarioTest.password,
      });


    expect(loginResponse.status).toBe(201);

    jwtToken = loginResponse.body.access_token;

    expect(jwtToken).toBeDefined();
  });

  it('debe crear un grupo correctamente', async () => {
    const response = await request(app.getHttpServer())
      .post('/grupos/AddGroup')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        nombre: 'Grupo Prueba E2E',
        descripcion: 'Descripción del grupo creado por E2E',
      });


    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensaje', 'Grupo creado correctamente');
    expect(response.body.suscripcion).toHaveProperty('id');
    expect(response.body.suscripcion).toMatchObject({
      nombre: 'Grupo Prueba E2E',
      descripcion: 'Descripción del grupo creado por E2E',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
