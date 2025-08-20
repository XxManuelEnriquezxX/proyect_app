import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CreateGroupUseCase } from '../../../grupos/application/use-cases/create-group.use-case';
import { CrearGrupoDTO } from '../../application/dtos/create-group.dto';
import { ObtenerGruposUseCase } from '../../application/use-cases/getAll-groups.use-case';
import { UpdateGroupDTO } from '../../application/dtos/update-group.dto';
import { ActualizarGrupoUseCase } from '../../application/use-cases/update-group.use-case';
import { EliminarGrupoUseCase } from '../../application/use-cases/delete-group.use-case';
import { ObtenerGruposDuenioUseCase } from '../../application/use-cases/obtener-grupos-duenio.use-case';
@UseGuards(JwtAuthGuard)
@Controller('grupos')
export class GrupoController {
  constructor(
    private readonly createSuscripcionUseCase: CreateGroupUseCase,
    private readonly obtenerSuscripcionesUseCase: ObtenerGruposUseCase,
    private readonly actualizarSuscripcionUseCase : ActualizarGrupoUseCase,
    private readonly eliminarSuscripcionUseCase : EliminarGrupoUseCase,
    private readonly obtenerGruposDuenioUseCase: ObtenerGruposDuenioUseCase
  ) {}

  @Post('AddGroup')
  async crear(@Request() req, @Body() dto: CrearGrupoDTO) {
    console.log('req.user:', req.user);
    const ownerId = req.user.sub;
    console.log("owner ID:" + ownerId);

    const nueva = await this.createSuscripcionUseCase.execute({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      ownerId,
    });

    return {
      mensaje: 'Suscripción creada correctamente',
      suscripcion: nueva.value(),
    };
  }
  @Get('GetAllGroups')
  async obtenerTodas() {
    const suscripciones = await this.obtenerSuscripcionesUseCase.execute();
    return suscripciones.map(s => s.value());
  }
  @Put('UpdateGroup/:id')
  async actualizar(@Param('id') id: string, @Body() dto: UpdateGroupDTO) {
    const actualizada = await this.actualizarSuscripcionUseCase.execute(id, dto);
    return {
      mensaje: 'Suscripción actualizada correctamente',
      suscripcion: actualizada.value(),
    };
  }
  @Delete('DeleteGroup/:id')
  async eliminar(@Param('id') id: string) {
    await this.eliminarSuscripcionUseCase.execute(id);
    return {
      mensaje: 'Suscripción eliminada correctamente',
    };
  }
  @Get('MisGrupos')
  async obtenerMisGrupos(@Request() req) {
  const grupos = await this.obtenerGruposDuenioUseCase.execute(req.user.sub);
  return grupos.map((g) => g.value());
}
}
