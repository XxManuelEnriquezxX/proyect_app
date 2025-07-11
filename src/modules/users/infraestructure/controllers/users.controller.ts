import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/use-cases/create-user.use-case';
import { CrearUsuarioDTO } from '../../application/dtos/create-user.dto';
import { User } from '../../domain/entities/user';
import { UserResponseDTO } from '../../application/dtos/response-user.dto';
import { GetAllUsersUseCase } from '../../application/use-cases/getAll-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
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

  @Get('GetAllUsers')
  async findAll() {
    const users = await this.getAllUsersUseCase.execute();
    return users.map(user => user.value());
  }
}