import { Grupo } from "../entities/grupo";

export abstract class IGrupoRepository {
  abstract buscarPorId(id: string): Promise<Grupo | null>;
  abstract crear(suscripcion: Grupo): Promise<Grupo>;
  abstract actualizar(id: string, suscripcion: Grupo): Promise<Grupo>;
  abstract eliminar(id: string): Promise<void>;
  abstract obtenerTodas(): Promise<Grupo[]>;
  abstract obtenerPorOwner(ownerId: string): Promise<Grupo[]>;
}
