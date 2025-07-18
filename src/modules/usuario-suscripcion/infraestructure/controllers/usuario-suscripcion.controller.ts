import { Body, Controller, Delete, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AsociarUsuarioDTO } from '../../application/dtos/asociarUsuario.dto';
import { AsociarUsuarioUseCase } from 'src/modules/usuario-suscripcion/application/use-cases/asociar-usuario.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { SalirDeSuscripcionUseCase } from '../../application/use-cases/salirSuscripcion.use-case';
import { EliminarMiembroUseCase } from '../../application/use-cases/eliminarMiembro-use.case';


@UseGuards(JwtAuthGuard)
@Controller('usuarioSuscripcion')
export class UsuarioSuscripcionController {
  constructor(
    private readonly asociarUsuarioUseCase: AsociarUsuarioUseCase,
    private readonly eliminarMiembroUseCase : EliminarMiembroUseCase,
    private readonly salirDeSuscripcionUseCase: SalirDeSuscripcionUseCase

  ) {}

  @Post('AddUserToGroup')
  async asociar(@Body() dto: AsociarUsuarioDTO) {
    const asociacion = await this.asociarUsuarioUseCase.execute(dto);
    return {
      mensaje: 'Usuario asociado correctamente',
      relacion: asociacion.value(),
    };
  }

  @Delete('GetOutGroup/:suscripcionId')
    async salirseDeGrupo(
    @Request() req,
    @Param('suscripcionId') suscripcionId: string,
    ) {
    await this.salirDeSuscripcionUseCase.execute(req.user.sub, suscripcionId);

    return {
        mensaje: 'Te has salido de la suscripción',
    };
    }

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

