import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './infraestructure/controllers/users.controller';
import { PrismaService } from 'src/core/databases/prisma.service';
import { UserPrismaRepository } from './infraestructure/repositories/user-prisma.repository';
import { CrearUsuarioUseCase } from './application/use-cases/create-user.use-case';
import { IUserRepository } from './domain/interfaces/user-repository.interface';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    CrearUsuarioUseCase,
  ],
  exports: [UsersService], // 👈 ¡esto es lo que faltaba!
})
export class UsersModule {}
