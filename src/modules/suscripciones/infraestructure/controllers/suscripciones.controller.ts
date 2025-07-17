import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateSuscripcionUseCase } from 'src/modules/suscripciones/application/use-cases/create-suscripcion.use-case';
import { CrearSuscripcionDTO } from '../../application/dtos/create-subscription.dto';
import { ObtenerSuscripcionesUseCase } from '../../application/use-cases/getAllSuscripciones-suscripcion.use-case';
import { UpdateSuscripcionDTO } from '../../application/dtos/update-subscripcion.dto';
import { ActualizarSuscripcionUseCase } from '../../application/use-cases/update-suscripcion.use-case';
import { EliminarSuscripcionUseCase } from '../../application/use-cases/delete-suscripcion.use-case';
@UseGuards(JwtAuthGuard)
@Controller('suscripciones')
export class SuscripcionesController {
  constructor(
    private readonly createSuscripcionUseCase: CreateSuscripcionUseCase,
    private readonly obtenerSuscripcionesUseCase: ObtenerSuscripcionesUseCase,
    private readonly actualizarSuscripcionUseCase : ActualizarSuscripcionUseCase,
    private readonly eliminarSuscripcionUseCase : EliminarSuscripcionUseCase
  ) {}

  @Post('Add')
  async crear(@Request() req, @Body() dto: CrearSuscripcionDTO) {
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
  @Get('GetAll')
  async obtenerTodas() {
    const suscripciones = await this.obtenerSuscripcionesUseCase.execute();
    return suscripciones.map(s => s.value());
  }
  @Put('UpdateSubscription/:id')
  async actualizar(@Param('id') id: string, @Body() dto: UpdateSuscripcionDTO) {
    const actualizada = await this.actualizarSuscripcionUseCase.execute(id, dto);
    return {
      mensaje: 'Suscripción actualizada correctamente',
      suscripcion: actualizada.value(),
    };
  }
  @Delete('DeleteSubscription/:id')
  async eliminar(@Param('id') id: string) {
    await this.eliminarSuscripcionUseCase.execute(id);
    return {
      mensaje: 'Suscripción eliminada correctamente',
    };
  }
}
