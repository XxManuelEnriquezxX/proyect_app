import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Creamos un mock para AuthService
const mockAuthService = {
  login: jest.fn(),
  register: jest.fn(),
  validateUser: jest.fn(),
  // Agrega aquí cualquier otro método que use tu AuthController
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        // Proporcionamos AuthService como un provider
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Aquí puedes agregar más tests para AuthController
});
