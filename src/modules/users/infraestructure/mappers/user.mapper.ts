import { User } from '../../domain/entities/user';

/**
 * Mapper entre modelo Prisma y entidad de dominio User
 */
export class UserMapper {
  /**
   * Convierte un objeto de Prisma a entidad User
   */
  static toDomain(raw: any): User {
    return new User(
      raw.id,                
      raw.nombreUsuario,     
      raw.password,          
      raw.email,             
      raw.name,              
      raw.apellidoPaterno,   
      raw.apellidoMaterno,  
      raw.suscripto         
    );
  }

  /**
   * Convierte una entidad User a objeto plano para persistencia
   */
  static toPersistence(user: User): any {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      suscripto: user.suscripto,
      nombreUsuario: user.nombreUsuario,
      apellidoPaterno : user.apellidoPaterno,
      apellidoMaterno : user.apellidoMaterno,
    };
  }
}
