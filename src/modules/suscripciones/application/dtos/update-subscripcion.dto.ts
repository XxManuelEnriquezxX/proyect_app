import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSuscripcionDTO {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;
}
