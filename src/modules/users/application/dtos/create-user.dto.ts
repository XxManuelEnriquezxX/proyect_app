import { IsEmail, IsNotEmpty, IsOptional, IsBoolean, Min, isString, IsString, minLength, MinLength, MaxLength} from "class-validator";

export class CrearUsuarioDTO {
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @IsString({message: 'El nombre es una cadena de texto'})
    @MinLength(3, {message : 'El Nombre debe contener al menos 3 letras'})
    @MaxLength(64,{message: 'El tamaño de un nombre debe de ser máximo de 64 letras'})
    name: string
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    apellidoPaterno: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    apellidoMaterno: string;
    @IsEmail()
    email: string;

    @IsBoolean()
    @IsOptional()
    suscripto? : boolean;

    @IsNotEmpty()
    @MinLength(4, {message : 'El nombre de usuario debe tener al menos 4 letras'})
    nombreUsuario: string;
    @IsNotEmpty()
    @MinLength(4, {message : 'Contraseña muy débil, necesita más carácteres'})
    password : string;
}