import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    //ToDo: comparar contraseña cifrada
    console.log(user);
    console.log(username);
    console.log(pass);
    if (user && await bcrypt.compare(pass, user.password)) {

      const { password, ...result } = user;
      return result;
    }
    return null;
  }
    async createJWT(user: any) {
      console.log(process.env.JWT_SECRET)
        const payload = { username: user.username, sub: user.id };
        return {
        user,
        access_token: this.jwtService.sign(payload),
        };
    }
}