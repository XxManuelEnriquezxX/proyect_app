import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';

@Injectable()
export class DeleteUserUseCase {
  // Inyectamos la abstracción (el contrato), no la implementación concreta.
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Lógica de negocio: verificar que el usuario existe antes de borrar.
    const userExists = await this.userRepository.buscarPorId(id);

    if (!userExists) {
      throw new NotFoundException(`El usuario con el ID '${id}' no fue encontrado.`);
    }

    // Si existe, se lo pasamos al repositorio para que lo elimine.
    await this.userRepository.eliminar(id);
  }
}