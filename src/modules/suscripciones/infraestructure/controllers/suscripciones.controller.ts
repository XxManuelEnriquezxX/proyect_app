import { Body, Controller, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateSuscripcionUseCase } from 'src/modules/suscripciones/application/use-cases/create-suscripcion.use-case';
import { CrearSuscripcionDTO } from '../../application/dtos/create-subscription.dto';
import { UpdateSuscripcionDTO } from '../../application/dtos/update-subscripcion.dto';
import { ActualizarSuscripcionUseCase } from '../../application/use-cases/update-suscripcion.use-case';

@UseGuards(JwtAuthGuard)
@Controller('suscripciones')
export class SuscripcionesController {
  constructor(
    private readonly createSuscripcionUseCase: CreateSuscripcionUseCase,
    private readonly actualizarSuscripcionUseCase : ActualizarSuscripcionUseCase,
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

  @Put('UpdateSubscription/:id')
  async actualizar(@Param('id') id: string, @Body() dto: UpdateSuscripcionDTO) {
    const actualizada = await this.actualizarSuscripcionUseCase.execute(id, dto);
    return {
      mensaje: 'Suscripción actualizada correctamente',
      suscripcion: actualizada.value(),
    };
  }
}
