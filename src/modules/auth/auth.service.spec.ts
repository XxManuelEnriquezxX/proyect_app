import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  // Crear mocks para las dependencias
  const mockUsersService = {
    findOne: jest.fn(),
    create: jest.fn(),
    // Agrega cualquier otro método que use AuthService
  };

  const mockJwtService = {
    sign: jest.fn(() => 'test-token'),
    verify: jest.fn(),
    // Agrega cualquier otro método que use AuthService
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Aquí puedes agregar más tests para AuthService
});
