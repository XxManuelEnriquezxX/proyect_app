export class User {
  id: string;
  nombreUsuario: string;
  password: string;
  email: string;
  name: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  suscripto: boolean;


  constructor(
    id: string,
    nombreUsuario: string,
    password: string,
    email: string,
    name: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    suscripto: boolean = false
  ) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.password = password;
    this.email = email;
    this.name = name;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.suscripto = suscripto;

  }

  value() {
    return {
      name: this.name,
      email: this.email,
      suscripto: this.suscripto,
      nombreUsuario: this.nombreUsuario,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
    };
  }
}
