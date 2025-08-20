import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CrearUsuarioUseCase } from '../../application/use-cases/create-user.use-case';
import { ActualizarUsuarioUseCase } from '../../application/use-cases/update-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/getAll-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { HttpStatus } from '@nestjs/common';
import { User } from '../../domain/entities/user';

describe('UsersController', () => {
  let controller: UsersController;
  let crearUsuarioUseCase: CrearUsuarioUseCase;
  let actualizarUsuarioUseCase: ActualizarUsuarioUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CrearUsuarioUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ActualizarUsuarioUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    crearUsuarioUseCase = module.get<CrearUsuarioUseCase>(CrearUsuarioUseCase);
    actualizarUsuarioUseCase = module.get<ActualizarUsuarioUseCase>(ActualizarUsuarioUseCase);
    getAllUsersUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Crear usuario', () => {
    it('should create a user and return DTO', async () => {
      const userData = {
        nombreUsuario: 'tester1',
        email: 'charly@ejemplo.com',
        password: '123',
        name: 'Test',
        apellidoPaterno: 'Almomonte',
        apellidoMaterno: 'Alvarez',
        suscripto: true
      };

      const createdUser = new User(
        '1',
        userData.nombreUsuario,
        'hashedpassword',
        userData.email,
        userData.name,
        userData.apellidoPaterno,
        userData.apellidoMaterno,
        userData.suscripto
      );

      jest.spyOn(crearUsuarioUseCase, 'execute').mockResolvedValue(createdUser);

      const result = await controller.crear(userData);

      expect(crearUsuarioUseCase.execute).toHaveBeenCalledWith(userData);
      expect(result).toEqual({
        id: createdUser.id,
        nombreUsuario: createdUser.nombreUsuario,
        email: createdUser.email,
        name: createdUser.name,
        apellidoPaterno: createdUser.apellidoPaterno,
        apellidoMaterno: createdUser.apellidoMaterno,
        suscripto: createdUser.suscripto
      });
    });
  });

    describe('Actualizar usuario', () => {
    it('should update a user and return DTO', async () => {
      const userId = '1';
      const updateData = {
        email: 'charly@ejemplo.com',
        name: 'Test'
      };

      const updatedUser = new User(
        userId,
        'testuser',
        'hashedpassword',
        'updated@example.com',
        'Updated',
        'User',
        'Test',
        true
      );

      jest.spyOn(actualizarUsuarioUseCase, 'execute').mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateData);

      expect(actualizarUsuarioUseCase.execute).toHaveBeenCalledWith(userId, updateData);
      expect(result).toEqual({
        id: updatedUser.id,
        nombreUsuario: updatedUser.nombreUsuario,
        email: updatedUser.email,
        name: updatedUser.name,
        apellidoPaterno: updatedUser.apellidoPaterno,
        apellidoMaterno: updatedUser.apellidoMaterno,
        suscripto: updatedUser.suscripto
      });
    });
  });
  
 
  describe('Obtener todos los usuarios', () => {
    it('should return all users', async () => {
      const users = [
        new User('1', 'usuario1', '12334', 'jose@gmail.com', 'Jose', 'Lorenzo', 'Arriaga', true),
        new User('2', 'usuario2', '1234', 'Antonio2@gmail.com', 'Antonio', 'Sanchez', 'Herrera', false)
      ];

      jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(getAllUsersUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(users.map(user => user.value()));
    });
  });

  describe('Eliminar usuario', () => {
    it('should delete a user', async () => {
      const userId = '1';
      
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(undefined);

      await controller.delete(userId);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId);
    });
  });
});
