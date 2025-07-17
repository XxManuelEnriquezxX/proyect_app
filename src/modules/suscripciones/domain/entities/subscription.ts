export class Suscripcion {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion?: string;
  readonly ownerId: string;
  readonly createdAt?: Date;

  constructor(
    id: string,
    nombre: string,
    ownerId: string,
    descripcion?: string,
    createdAt?: Date,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
  }

  value() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
    };
  }
}
