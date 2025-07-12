import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';

@Injectable()
export class GetAllUsersUseCase{
    constructor(private readonly userRepository: IUserRepository){}

    async execute(): Promise<User[]>{
        return await this.userRepository.obtenerTodos();
    }
}