import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { CrearUsuarioDTO } from '../dtos/create-user.dto';

/**
 * Caso de uso para crear un usuario
 */
@Injectable()
export class CrearUsuarioUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Ejecuta la lógica del caso de uso
   * @param dto - datos para crear usuario
   * @returns usuario creado
   */
  async execute(dto: CrearUsuarioDTO): Promise<User> {
    const user = new User(
      '', // ID lo genera la BD
      dto.name,
      dto.email,
      dto.suscripto ?? false,
      dto.nombreUsuario,
      dto.apellidoPaterno,
      dto.apellidoMaterno
    );

    return await this.userRepository.crear(user);
  }
}