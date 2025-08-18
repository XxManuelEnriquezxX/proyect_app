import { UsuarioGrupo } from "../entities/usuarioGrupo";
import { Grupo } from "src/modules/grupos/domain/entities/grupo";
export abstract class IUsuarioGrupoRepository {
  abstract crear(usuarioSuscripcion: UsuarioGrupo): Promise<UsuarioGrupo>;

  abstract existeRelacion(usuarioId: string, suscripcionId: string): Promise<boolean>;
  //Agregando la Eliminacion
  abstract eliminar(usuarioId: string, suscripcionId: string): Promise<void>;
  abstract verificarExistencia(usuarioId:string, grupoId: string): Promise<boolean>;
  abstract obtenerGruposPorUsuario(usuarioId: string): Promise<Grupo[]>;

}
