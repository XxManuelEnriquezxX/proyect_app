import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateSuscripcionUseCase } from 'src/modules/suscripciones/application/use-cases/create-suscripcion.use-case';
import { CrearSuscripcionDTO } from '../../application/dtos/create-subscription.dto';

@UseGuards(JwtAuthGuard)
@Controller('suscripciones')
export class SuscripcionesController {
  constructor(
    private readonly createSuscripcionUseCase: CreateSuscripcionUseCase,
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
}
