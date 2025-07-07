import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/use-cases/create-user.use-case';
import { CrearUsuarioDTO } from '../../application/dtos/create-user.dto';
import { User } from '../../domain/entities/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() dto: CrearUsuarioDTO): Promise<User> {
    const nuevoUsuario = await this.crearUsuarioUseCase.execute(dto);
    return nuevoUsuario;
  }
}