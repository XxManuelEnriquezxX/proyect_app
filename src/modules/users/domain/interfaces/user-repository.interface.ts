import { User } from "../entities/user";

export abstract class IUserRepository{
    abstract crear(user: User): Promise<User>;
    abstract buscarPorId(id:string): Promise<User | null>;
    abstract obtenerTodos(): Promise<User[]>;
     abstract obtenerTodos(): Promise<User[]>;
}