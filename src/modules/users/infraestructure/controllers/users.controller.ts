import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/use-cases/create-user.use-case';
import { CrearUsuarioDTO } from '../../application/dtos/create-user.dto';
import { User } from '../../domain/entities/user';
import { UserResponseDTO } from '../../application/dtos/response-user.dto';
import { ActualizarUsuarioDTO } from '../../application/dtos/update-user.dto';
import { ActualizarUsuarioUseCase } from '../../application/use-cases/update-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/getAll-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  createUser(userData: { nombreUsuario: string; email: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  updateUser(userId: string, userData: { nombreUsuario: string; email: string; }) {
    throw new Error('Method not implemented.');
  }
  
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,  
    private readonly actualizarUsuarioUserCase : ActualizarUsuarioUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly deleteUserUserCase: DeleteUserUseCase
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
  @Get('GetAllUsers')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const users = await this.getAllUsersUseCase.execute();
    return users;
    //return users.map(user => user.value());
  }
//Se añadio delete
  @Delete(':id')
  @HttpCode(HttpStatus.OK) // Código 204: la operación fue exitosa pero no hay contenido que devolver
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserUserCase.execute(id);
  }


}

  