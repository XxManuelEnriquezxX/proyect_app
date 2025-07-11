import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { CrearUsuarioDTO } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';
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
    try { 
      const passwordCifrada = await bcrypt.hash(dto.password, 5); //el 5 es el número de iteracciones
      const user = new User(
      '', // ID lo genera la BD
        dto.nombreUsuario,
        passwordCifrada, 
        dto.email,
        dto.name,
        dto.apellidoPaterno,
        dto.apellidoMaterno,
        dto.suscripto ?? false
      );
    return await this.userRepository.crear(user);
    }catch(error){
      if(
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ){
        throw new ConflictException(`El nombre de usuario o email ya está en uso.`);
      }
       throw error;
    }
    
  }
}