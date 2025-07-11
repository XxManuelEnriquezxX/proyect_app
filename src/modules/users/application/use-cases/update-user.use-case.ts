import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { ActualizarUsuarioDTO } from '../dtos/update-user.dto';
import { User } from '../../domain/entities/user';

@Injectable()
export class ActualizarUsuarioUseCase{
    constructor(private readonly userRepository:IUserRepository){}

    async execute(id: string, dto: ActualizarUsuarioDTO): Promise<User>{
      const user = await this.userRepository.buscarPorId(id);
      if(!user) throw new NotFoundException('Usuario no encontrado');
      const actualizado = new User(
      user.id,
      dto.nombreUsuario ?? user.nombreUsuario,
      user.password, // Mantenemos la contraseña
      dto.email ?? user.email,
      dto.name ?? user.name,
      dto.apellidoPaterno ?? user.apellidoPaterno,
      dto.apellidoMaterno ?? user.apellidoMaterno,
      dto.suscripto ?? user.suscripto
    );
    return await this.userRepository.actualizar(id, actualizado)
    }
}