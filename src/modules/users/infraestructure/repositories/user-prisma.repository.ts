import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserPrismaRepository extends IUserRepository {
  constructor(private readonly prisma: PrismaService) {
    super(); 
  }

  async crear(user: User): Promise<User> {
    const created = await this.prisma.usuarios.create({
      data: {
        ...UserMapper.toPersistence(user),
        id: undefined, 
      },
    });

    return UserMapper.toDomain(created);
  }

  async buscarPorId(id: string): Promise<User | null> {
    const found = await this.prisma.usuarios.findUnique({ where: { id } });
    return found ? UserMapper.toDomain(found) : null;
  }

  async obtenerTodos(): Promise<User[]> {
    const all = await this.prisma.usuarios.findMany();
    return all.map(UserMapper.toDomain);
  }

  async actualizar(id: string, user: User): Promise<User> {
  const raw = await this.prisma.usuarios.update({
    where: { id },
    data: UserMapper.toPersistence(user),
  });
  return UserMapper.toDomain(raw);
  }

}
