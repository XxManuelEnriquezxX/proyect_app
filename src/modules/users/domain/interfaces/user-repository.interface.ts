import { User } from "../entities/user";

export abstract class IUserRepository{
    abstract crear(user: User): Promise<User>;
    abstract buscarPorId(id:string): Promise<User | null>;
    abstract obtenerTodos(): Promise<User[]>;
    abstract actualizar(id: string, user:User):Promise<User>;
}