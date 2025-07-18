import { Body, Controller, Delete, Post, UseGuards, Request } from '@nestjs/common';
import { AsociarUsuarioDTO } from '../../application/dtos/asociarUsuario.dto';
import { AsociarUsuarioUseCase } from 'src/modules/usuario-suscripcion/application/use-cases/asociar-usuario.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { EliminarMiembroUseCase } from '../../application/use-cases/eliminarMiembro-use.case';

@UseGuards(JwtAuthGuard)
@Controller('usuarioSuscripcion')
export class UsuarioSuscripcionController {
  constructor(
    private readonly asociarUsuarioUseCase: AsociarUsuarioUseCase,
    private readonly eliminarMiembroUseCase : EliminarMiembroUseCase,
  ) {}

  @Post('AddUserToGroup')
  async asociar(@Body() dto: AsociarUsuarioDTO) {
    const asociacion = await this.asociarUsuarioUseCase.execute(dto);
    return {
      mensaje: 'Usuario asociado correctamente',
      relacion: asociacion.value(),
    };
  }

    @Delete('DeleteUserOfGroup')
    async eliminarUsuarioDeGrupo(@Request() req, @Body() dto: AsociarUsuarioDTO) {
    await this.eliminarMiembroUseCase.execute({
        ownerId: req.user.sub, // del JWT
        suscripcionId : dto.suscripcionId,
        usuarioId: dto.usuarioId,
    });

    return {
        mensaje: 'Usuario eliminado de la suscripción',
    };
    }                                           

}                                           
