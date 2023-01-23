import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

describe('LeadsController', () => {
  let controller: LeadsController;
  let leadService: LeadsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [LeadsService, PrismaService],
    })
      .compile();

    controller = module.get<LeadsController>(LeadsController);

    const mockPrismaService = {
      lead: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      }
    } as unknown as PrismaService
    prismaService = mockPrismaService
    leadService = new LeadsService(prismaService);
    controller = new LeadsController(leadService);

  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('FindAll ', async () => {
    const allLeads = await controller.findAll({})
    expect(allLeads).toHaveLength(0)
  });
});
