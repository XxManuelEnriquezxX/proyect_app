import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/databases/prisma.service';
@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService){}

  async findOne(nombreUsuario: string){
    console.log(nombreUsuario);
        return await this.prisma.usuarios.findUnique({
            where : {nombreUsuario},
        });
    }
}