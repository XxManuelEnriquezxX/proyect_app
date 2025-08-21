import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('PUT /grupos/UpdateGroup/:id (E2E)', () => {
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

    // Obtener el grupo del usuario autenticado
    const misGruposResponse = await request(app.getHttpServer())
      .get('/grupos/MisGrupos')
      .set('Authorization', `Bearer ${jwtToken}`);

    const grupos = misGruposResponse.body;
    expect(grupos.length).toBeGreaterThan(0);
    idGrupo = grupos[0].id; // Usamos el primer grupo
    console.log('ID del grupo a actualizar:', idGrupo);
  });

  it('debe actualizar el grupo correctamente', async () => {
    const response = await request(app.getHttpServer())
      .put(`/grupos/UpdateGroup/${idGrupo}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        nombre: 'Grupo Actualizado E2E',
        descripcion: 'Descripción actualizada por prueba E2E',
      });

    console.log('Respuesta de actualización:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.suscripcion.nombre).toBe('Grupo Actualizado E2E');
    expect(response.body.suscripcion.descripcion).toBe('Descripción actualizada por prueba E2E');
  });

  afterAll(async () => {
    await app.close();
  });
});
