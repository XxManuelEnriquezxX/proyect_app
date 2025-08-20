import { Body, Controller, Delete, Post, UseGuards, Request, Param, Get } from '@nestjs/common';
import { AsociarUsuarioDTO } from '../../application/dtos/asociarUsuario.dto';
import { AsociarUsuarioUseCase } from '../../../grupo-user/application/use-cases/asociar-usuario.use-case';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { EliminarMiembroUseCase } from '../../application/use-cases/eliminarMiembro-use.case';
import{SalirDeGrupoUseCase} from '../../application/use-cases/salirseDeGrupo-use.case';
import { ObtenerGruposMiembroUseCase } from '../../application/use-cases/obtener-grupos-miembro.use-case';
import { ObtenerMiembrosGrupoUseCase } from '../../application/use-cases/obtener-miembros-grupo.use-case';

@UseGuards(JwtAuthGuard)
@Controller('usuarioGrupo')
export class UsuarioGrupoController {
  constructor(
    private readonly asociarUsuarioUseCase: AsociarUsuarioUseCase,
    private readonly eliminarMiembroUseCase : EliminarMiembroUseCase,
    private readonly salirseDeGrupoUseCase: SalirDeGrupoUseCase,
    private readonly obtenerGruposMiembroUseCase: ObtenerGruposMiembroUseCase,
    private readonly obtenerMiembrosGrupoUseCase: ObtenerMiembrosGrupoUseCase
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
  
  @Delete('GetOutGroup/:grupoId')
  async salirseDeGrupo(@Request() req, @Param('grupoId') grupoId: string){
    await this.salirseDeGrupoUseCase.execute(req.user.sub, grupoId);
    return{
      mensaje: 'Te has salido del grupo',
    };
  }

  @Get('GruposMiembro')
  async obtenerGruposMiembro(@Request() req) 
  {
   const grupos = await this.obtenerGruposMiembroUseCase.execute(req.user.sub);
   return grupos.map((g) => g.value());
  }

  @Get('MiembrosDeGrupo/:grupoId')
 async obtenerMiembros(@Request() req, @Param('grupoId') grupoId: string) {
  const miembros = await this.obtenerMiembrosGrupoUseCase.execute(req.user.sub, grupoId);
  return miembros.map((m) => m.value());
}
}                                           
