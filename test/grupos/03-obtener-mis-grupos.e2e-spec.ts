import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('GET /grupos/MisGrupos (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;

  const usuarioExistente = {
    nombreUsuario: 'tesCristhian', 
    password: 'cristhian123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Login con el usuario ya existente
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(usuarioExistente);

    jwtToken = loginResponse.body.access_token;
  });

  it('debe obtener los grupos del usuario autenticado', async () => {
    const response = await request(app.getHttpServer())
      .get('/grupos/MisGrupos')
      .set('Authorization', `Bearer ${jwtToken}`);

    console.log('📥 Mis grupos:', response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('ownerId');
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
