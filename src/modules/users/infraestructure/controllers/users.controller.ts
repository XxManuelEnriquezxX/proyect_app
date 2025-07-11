import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/use-cases/create-user.use-case';
import { CrearUsuarioDTO } from '../../application/dtos/create-user.dto';
import { User } from '../../domain/entities/user';
import { UserResponseDTO } from '../../application/dtos/response-user.dto';
import { ActualizarUsuarioDTO } from '../../application/dtos/update-user.dto';
import { ActualizarUsuarioUseCase } from '../../application/use-cases/update-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,  
    private readonly actualizarUsuarioUserCase : ActualizarUsuarioUseCase
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
  @Put('UpdateUser/:id')
  async update(@Param('id') id:string, @Body()dto:ActualizarUsuarioDTO) : Promise<UserResponseDTO>{
    const usuarioActualizado = await this.actualizarUsuarioUserCase.execute(id, dto);
    return {
       id: usuarioActualizado.id,
      nombreUsuario: usuarioActualizado.nombreUsuario,
      email: usuarioActualizado.email,
      name: usuarioActualizado.name,
      apellidoPaterno: usuarioActualizado.apellidoPaterno,
      apellidoMaterno: usuarioActualizado.apellidoMaterno,
      suscripto: usuarioActualizado.suscripto,
    };
  }

}
