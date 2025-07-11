import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/use-cases/create-user.use-case';
import { CrearUsuarioDTO } from '../../application/dtos/create-user.dto';
import { User } from '../../domain/entities/user';
import { UserResponseDTO } from '../../application/dtos/response-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase
  ) {}

  @Post('Add')
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() dto: CrearUsuarioDTO): Promise<UserResponseDTO> {
    const nuevoUsuario = await this.crearUsuarioUseCase.execute(dto);
    return {   
      id: nuevoUsuario.id,
      nombreUsuario: nuevoUsuario.nombreUsuario,
      email: nuevoUsuario.email,
      name: nuevoUsuario.name,
      apellidoPaterno: nuevoUsuario.apellidoPaterno,
      apellidoMaterno: nuevoUsuario.apellidoMaterno,
      suscripto: nuevoUsuario.suscripto
    }
  }
}