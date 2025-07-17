import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma'; // Ajusta si usas alias

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private _usuarios: any;
  private _suscripcion: any;
  public get suscripcion(): any {
    return this._suscripcion;
  }
  public set suscripcion(value: any) {
    this._suscripcion = value;
  }
  public get usuarios(): any {
    return this._usuarios;
  }
  public set usuarios(value: any) {
    this._usuarios = value;
  }
  user: any;
  async onModuleInit() {
    await this.$connect();
  }
}