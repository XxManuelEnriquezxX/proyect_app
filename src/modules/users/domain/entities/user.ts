export class User {
  id: string;
  name: string;
  email: string;
  suscripto: boolean;
  nombreUsuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;

  constructor(
    id: string,
    name: string,
    email: string,
    suscripto: boolean = false,
    nombreUsuario: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.suscripto = suscripto;
    this.nombreUsuario = nombreUsuario;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
  }

  value() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      suscripto: this.suscripto,
      nombreUsuario: this.nombreUsuario,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
    };
  }
}
