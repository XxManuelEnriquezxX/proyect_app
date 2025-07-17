import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateSuscripcionUseCase } from 'src/modules/suscripciones/application/use-cases/create-suscripcion.use-case';

@UseGuards(JwtAuthGuard)
@Controller('suscripciones')
export class SuscripcionesController {
  constructor(
    private readonly createSuscripcionUseCase: CreateSuscripcionUseCase,
  ) {}

  @Post('Add')
  async crear(@Request() req, @Body() body: any) {
    console.log('req.user:', req.user);
    const ownerId = req.user.sub;
    console.log("owner ID:" + ownerId);
    const { nombre, descripcion } = body;

    const nueva = await this.createSuscripcionUseCase.execute({
      nombre,
      descripcion,
      ownerId,
    });

    return {
      mensaje: 'Suscripción creada correctamente',
      suscripcion: nueva.value(),
    };
  }
}
