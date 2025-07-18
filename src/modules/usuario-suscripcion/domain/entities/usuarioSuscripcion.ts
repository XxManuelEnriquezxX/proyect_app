export class UsuarioSuscripcion { 
    readonly id: string;
    readonly usuarioId: string;
    readonly suscripcionId: string;

    constructor(
        id:string,
        usuarioId: string,
        suscripcionId: string
    ){
        this.id = id;
        this.usuarioId = usuarioId;
        this.suscripcionId = suscripcionId;
    }

    value(){
        return {
            id: this.id,
            usuarioId:this.usuarioId,
            suscripcionId : this.suscripcionId
        }
    }
}