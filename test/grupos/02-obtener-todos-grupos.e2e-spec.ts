import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('GET /grupos/GetAllGroups (E2E)', () => {
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

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(usuarioExistente);

    jwtToken = loginResponse.body.access_token;
  });

  it('debe obtener todos los grupos', async () => {
    const response = await request(app.getHttpServer())
      .get('/grupos/GetAllGroups')
      .set('Authorization', `Bearer ${jwtToken}`);

    console.log('📥 Grupos obtenidos:', response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
