// Archivo: test/users/users-setup.ts

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../../src/app.module';
import { PrismaService } from './../../src/core/databases/prisma.service';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

export class UsersTestSetup {
  app: INestApplication;
  prisma: PrismaService;
  authToken: string;
  testUserId: string;

  async initialize() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleFixture.createNestApplication();
    this.prisma = moduleFixture.get<PrismaService>(PrismaService);
    await this.app.init();
  }

  async setupTestUserAndLogin() {
    const hashedPassword = await bcrypt.hash('password123', 5);
    const testUser = await this.prisma.usuarios.create({
      data: {
        nombreUsuario: 'charly',
        password: hashedPassword,
        email: 'charlye@ejemplo.com',
        name: 'Chaa',
        apellidoPaterno: 'Alvarez',
        apellidoMaterno: 'García',
        suscripto: false,
      },
    });
    this.testUserId = testUser.id;

    const loginResponse = await request(this.app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'charly',
        password: 'password123',
      });
    this.authToken = loginResponse.body.access_token;
  }

  async cleanDatabase() {
    await this.prisma.usuarios.deleteMany({});
  }

  async cleanup() {
    await this.app.close();
  }
}