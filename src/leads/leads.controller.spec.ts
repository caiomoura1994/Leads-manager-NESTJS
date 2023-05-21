import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { FindAllLeadsDto } from './dto/findall-lead.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generateMockLead } from '../utils/test-utils';

describe('LeadsController', () => {
  let leadsController: LeadsController;
  let leadsService: LeadsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [LeadsService, PrismaService],
    }).compile();

    leadsController = moduleRef.get<LeadsController>(LeadsController);
    leadsService = moduleRef.get<LeadsService>(LeadsService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const createLeadDto: Prisma.LeadCreateInput = generateMockLead(false);
      const mockLead = {
        ...createLeadDto,
        id: faker.number.int(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      jest.spyOn(leadsService, 'create').mockResolvedValue(mockLead);

      const result = await leadsController.create(createLeadDto);

      expect(leadsService.create).toHaveBeenCalledWith(createLeadDto);
      expect(result).toEqual(mockLead);
    });
  });

  describe('findAll', () => {
    it('should return an array of leads', async () => {
      const params: FindAllLeadsDto = {}; // You can customize the params object if needed
      const mockLeads = [
        generateMockLead(true),
        generateMockLead(true),
      ];

      jest.spyOn(leadsService, 'findAll').mockResolvedValue(mockLeads);

      const result = await leadsController.findAll(params);

      expect(leadsService.findAll).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockLeads);
    });
  });

  describe('findOne', () => {
    it('should return a lead by ID', async () => {
      const mockLead = generateMockLead(true);
      jest.spyOn(leadsService, 'findOne').mockResolvedValue(mockLead);

      const result = await leadsController.findOne(mockLead.id);

      expect(leadsService.findOne).toHaveBeenCalledWith(mockLead.id);
      expect(result).toEqual(mockLead);
    });
  });

  describe('update', () => {
    it('should update a lead by ID', async () => {
      const updateLeadDto: Prisma.LeadUpdateInput = generateMockLead(false);
      const mockLead = generateMockLead(true);
      jest.spyOn(leadsService, 'update').mockResolvedValue(mockLead);

      const result = await leadsController.update(mockLead.id, updateLeadDto);
      expect(leadsService.update).toHaveBeenCalledWith(mockLead.id, updateLeadDto);
      expect(result).toEqual(mockLead);
    });
  });

  describe('remove', () => {
    it('should delete a lead by ID', async () => {
      const mockLead = generateMockLead(true);
      jest.spyOn(leadsService, 'remove').mockResolvedValue(mockLead);

      const result = await leadsController.remove(mockLead.id);

      expect(leadsService.remove).toHaveBeenCalledWith(mockLead.id);
      expect(result).toEqual(mockLead);
    });
  });
});
