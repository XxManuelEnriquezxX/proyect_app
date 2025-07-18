import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AsociarUsuarioDTO } from '../../application/dtos/asociarUsuario.dto';
import { AsociarUsuarioUseCase } from 'src/modules/usuario-suscripcion/application/use-cases/asociar-usuario.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('usuarioSuscripcion')
export class UsuarioSuscripcionController {
  constructor(
    private readonly asociarUsuarioUseCase: AsociarUsuarioUseCase,
  ) {}

  @Post('AddUserToGroup')
  async asociar(@Body() dto: AsociarUsuarioDTO) {
    const asociacion = await this.asociarUsuarioUseCase.execute(dto);
    return {
      mensaje: 'Usuario asociado correctamente',
      relacion: asociacion.value(),
    };
  }
}
