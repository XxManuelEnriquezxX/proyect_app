import { UsuarioGrupo } from "../entities/usuarioGrupo";

export abstract class IUsuarioGrupoRepository {
  abstract crear(usuarioSuscripcion: UsuarioGrupo): Promise<UsuarioGrupo>;

  abstract existeRelacion(usuarioId: string, suscripcionId: string): Promise<boolean>;
  //Agregando la Eliminacion
  abstract eliminar(usuarioId: string, suscripcionId: string): Promise<void>;

}
