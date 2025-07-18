import { UsuarioSuscripcion } from "../entities/usuarioSuscripcion";

export abstract class IUsuarioSuscripcionRepository {
  abstract crear(usuarioSuscripcion: UsuarioSuscripcion): Promise<UsuarioSuscripcion>;

  abstract existeRelacion(usuarioId: string, suscripcionId: string): Promise<boolean>;
  //Agregando la Eliminacion
  abstract eliminar(usuarioId: string, suscripcionId: string): Promise<void>;

}
