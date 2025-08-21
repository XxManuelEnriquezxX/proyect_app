import { Test, TestingModule } from '@nestjs/testing';
import { GrupoController } from './grupos.controller';
import { CreateGroupUseCase } from '../../application/use-cases/create-group.use-case';
import { ObtenerGruposUseCase } from '../../application/use-cases/getAll-groups.use-case';
import { ActualizarGrupoUseCase } from '../../application/use-cases/update-group.use-case';
import { EliminarGrupoUseCase } from '../../application/use-cases/delete-group.use-case';
import { ObtenerGruposDuenioUseCase } from '../../application/use-cases/obtener-grupos-duenio.use-case';

describe('GrupoController', () => {
  let controller: GrupoController;
  let createGroupUseCase: CreateGroupUseCase;
  let obtenerGruposUseCase: ObtenerGruposUseCase;
  let actualizarGrupoUseCase: ActualizarGrupoUseCase;
  let obtenerGruposDuenioUseCase: ObtenerGruposDuenioUseCase;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [GrupoController],
      providers: [
        {
          provide: CreateGroupUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ObtenerGruposUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide : ActualizarGrupoUseCase,
          useValue: {
            execute : jest.fn(),
          },
        },
        { provide: EliminarGrupoUseCase, useValue: {} },
        { provide: ObtenerGruposDuenioUseCase, useValue: {execute: jest.fn()} },
      ],
    }).compile();

    controller = moduleRef.get<GrupoController>(GrupoController);
    createGroupUseCase = moduleRef.get<CreateGroupUseCase>(CreateGroupUseCase);
    obtenerGruposUseCase = moduleRef.get<ObtenerGruposUseCase>(ObtenerGruposUseCase);
    actualizarGrupoUseCase = moduleRef.get<ActualizarGrupoUseCase>(ActualizarGrupoUseCase);
    obtenerGruposDuenioUseCase = moduleRef.get<ObtenerGruposDuenioUseCase>(ObtenerGruposDuenioUseCase);

  });

  it('debe crear una suscripción correctamente', async () => {
    const mockReq = { user: { sub: 'user-id-123' } };
    const dto = { nombre: 'Grupo 1', descripcion: 'Descripción del grupo' };

    const mockGrupo = {
      value: () => ({
        id: 'grupo-id-1',
        nombre: 'Grupo 1',
        descripcion: 'Descripción del grupo',
        ownerId: 'user-id-123',
        createdAt: new Date(),
      }),
    };

    (createGroupUseCase.execute as jest.Mock).mockResolvedValue(mockGrupo);

    const result = await controller.crear(mockReq, dto);

    expect(createGroupUseCase.execute).toHaveBeenCalledWith({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      ownerId: 'user-id-123',
    });

    expect(result.mensaje).toBe('Grupo creado correctamente');

    expect(result.suscripcion).toMatchObject({
      id: 'grupo-id-1',
      nombre: 'Grupo 1',
      descripcion: 'Descripción del grupo',
      ownerId: 'user-id-123',
    });

    expect(result.suscripcion.createdAt).toBeInstanceOf(Date);
  });

 it('debe obtener todas los grupos correctamente', async () => {
  const mockGrupos = [
    {
      value: () => ({
        id: 'grupo-id-1',
        nombre: 'Grupo 1',
        descripcion: 'Descripción 1',
        ownerId: 'user-id-123',
        createdAt: new Date(),
      }),
    },
    {
      value: () => ({
        id: 'grupo-id-2',
        nombre: 'Grupo 2',
        descripcion: 'Descripción 2',
        ownerId: 'user-id-456',
        createdAt: new Date(),
      }),
    },
  ];

  (obtenerGruposUseCase.execute as jest.Mock).mockResolvedValue(mockGrupos);

  const result = await controller.obtenerTodas();

  expect(obtenerGruposUseCase.execute).toHaveBeenCalled();

  result.forEach((grupo, index) => {
    const esperado = mockGrupos[index].value();

    expect(grupo).toMatchObject({
      id: esperado.id,
      nombre: esperado.nombre,
      descripcion: esperado.descripcion,
      ownerId: esperado.ownerId,
    });

    expect(grupo.createdAt).toBeInstanceOf(Date);
  });
 });

 it('debe actualizar un grupo correctamente', async () => {
  const id = 'grupo-id-1';
  const dto = { nombre: 'Grupo Actualizado', descripcion: 'Descripción actualizada' };

  const mockGrupo = {
    value: () => ({
      id,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      ownerId: 'user-id-123',
      createdAt: new Date(),
    }),
  };

  (actualizarGrupoUseCase.execute as jest.Mock).mockResolvedValue(mockGrupo);

  const result = await controller.actualizar(id, dto);

  expect(actualizarGrupoUseCase.execute).toHaveBeenCalledWith(id, dto);

  expect(result.mensaje).toBe('Grupo actualizado correctamente');

  expect(result.suscripcion).toMatchObject({
    id: id,
    nombre: dto.nombre,
    descripcion: dto.descripcion,
    ownerId: 'user-id-123',
  });

  expect(result.suscripcion.createdAt).toBeInstanceOf(Date);
 });

 it('debe eliminar una suscripción correctamente', async () => {
  const id = 'grupo-id-1';

  const eliminarGrupoUseCase = moduleRef.get<EliminarGrupoUseCase>(EliminarGrupoUseCase);
  (eliminarGrupoUseCase.execute as jest.Mock) = jest.fn().mockResolvedValue(undefined);

  const result = await controller.eliminar(id);

  expect(eliminarGrupoUseCase.execute).toHaveBeenCalledWith(id);
  expect(result).toEqual({
    mensaje: 'Suscripción eliminada correctamente',
  });
 });

 it('debe obtener los grupos del dueño correctamente', async () => {
  const mockReq = { user: { sub: 'user-id-123' } };

  const mockGrupos = [
    {
      value: () => ({
        id: 'grupo-id-1',
        nombre: 'Grupo 1',
        descripcion: 'Desc 1',
        ownerId: 'user-id-123',
        createdAt: new Date(),
      }),
    },
    {
      value: () => ({
        id: 'grupo-id-2',
        nombre: 'Grupo 2',
        descripcion: 'Desc 2',
        ownerId: 'user-id-123',
        createdAt: new Date(),
      }),
    },
  ];

  const obtenerGruposDuenioUseCase = moduleRef.get<ObtenerGruposDuenioUseCase>(ObtenerGruposDuenioUseCase);
  (obtenerGruposDuenioUseCase.execute as jest.Mock).mockResolvedValue(mockGrupos);

  const result = await controller.obtenerMisGrupos(mockReq);

  expect(obtenerGruposDuenioUseCase.execute).toHaveBeenCalledWith('user-id-123');
  expect(result).toEqual(mockGrupos.map((g) => g.value()));
 });
});
