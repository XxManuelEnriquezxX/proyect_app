export class UsuarioGrupo { 
    readonly id: string;
    readonly usuarioId: string;
    readonly grupoId: string;

    constructor(
        id:string,
        usuarioId: string,
        grupoId: string
    ){
        this.id = id;
        this.usuarioId = usuarioId;
        this.grupoId = grupoId;
    }

    value(){
        return {
            id: this.id,
            usuarioId:this.usuarioId,
            grupoId : this.grupoId
        }
    }
}