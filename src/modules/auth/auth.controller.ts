import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Console, log } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)//Procesa la autenticación
    @Post('login')// /auth/login
    async login(@Request() req) 
    {
        console.log(req.user);
        
        return this.authService.createJWT(req.user);//Se lee el usuario autenticado
    }

    
    @UseGuards(LocalAuthGuard)
    @Post('logout') // /auth/logout
    async logout(@Request() req)
    {
        return req.logout();
    }

}