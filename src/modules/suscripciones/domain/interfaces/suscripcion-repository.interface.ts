import { Suscripcion } from "../entities/subscription";

export abstract class ISuscripcionRepository {
  abstract buscarPorId(id: string): Promise<Suscripcion | null>;
  abstract crear(suscripcion: Suscripcion): Promise<Suscripcion>;
  abstract actualizar(id: string, suscripcion: Suscripcion): Promise<Suscripcion>;
  abstract eliminar(id: string): Promise<void>;
  abstract obtenerTodas(): Promise<Suscripcion[]>;
}
