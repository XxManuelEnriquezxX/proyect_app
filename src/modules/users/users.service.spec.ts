import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../core/databases/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    usuarios: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find a user by nombreUsuario', async () => {
      const mockUser = { 
        id: '1', 
        nombreUsuario: 'Jose', 
        email: 'jose23@gmail.com',
        password: 'hashedpassword',
        name: 'Josep',
        apellidoPaterno: 'Salas',
        apellidoMaterno: 'Americo',
        suscripto: true
      };
      
      mockPrismaService.usuarios.findUnique.mockResolvedValue(mockUser);
      
      const result = await service.findOne('TestUser');
      
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuarios.findUnique).toHaveBeenCalledWith({
        where: { nombreUsuario: 'TestUser' }
      });
    });

    it('should return null if user is not found', async () => {
      mockPrismaService.usuarios.findUnique.mockResolvedValue(null);
      
      const result = await service.findOne('no exixte');
      
      expect(result).toBeNull();
    });
  });
});