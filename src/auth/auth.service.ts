import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    //ToDo: comparar contraseña cifrada
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
    async createJWT(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
        user,
        access_token: this.jwtService.sign(payload),
        };
    }
}