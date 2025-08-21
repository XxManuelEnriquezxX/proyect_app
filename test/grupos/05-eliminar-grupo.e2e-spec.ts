import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('DELETE /grupos/DeleteGroup/:id (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let idGrupo: string;

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

    // Login
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(usuarioExistente);

    jwtToken = loginResponse.body.access_token;

    const misGruposResponse = await request(app.getHttpServer())
      .get('/grupos/MisGrupos')
      .set('Authorization', `Bearer ${jwtToken}`);

    const grupos = misGruposResponse.body;
    expect(grupos.length).toBeGreaterThan(0);

    idGrupo = grupos[0].id;
    console.log('ID del grupo a eliminar:', idGrupo);
  });

  it('debe eliminar el grupo correctamente', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/grupos/DeleteGroup/${idGrupo}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    console.log('Respuesta de eliminación:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensaje', 'Suscripción eliminada correctamente');
  });

  afterAll(async () => {
    await app.close();
  });
});
