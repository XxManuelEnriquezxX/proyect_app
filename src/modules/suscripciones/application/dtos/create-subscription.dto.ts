import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearSuscripcionDTO {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(64)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;
}