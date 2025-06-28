import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private readonly users = [
        {
            id : 1,
            name : "Cristhian",
            username: "CrixGarx",
            password : "crg123g",
            active : true
        },
        {
            id : 2,
            name : "Carlos Eduardo",
            username: "Charlys",
            password : "char136",
            active : true
        },
        {
            id : 3,
            name : "José Manuel",
            username: "Manu OWO",
            password : "Manu169",
            active : true
        },
    ];

    findOne(username: string){
        return this.users.find(x => x.username === username);
    }
}