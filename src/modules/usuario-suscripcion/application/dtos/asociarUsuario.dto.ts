import { IsNotEmpty, IsString } from 'class-validator';

export class AsociarUsuarioDTO {
  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @IsNotEmpty()
  @IsString()
  suscripcionId: string;
}
