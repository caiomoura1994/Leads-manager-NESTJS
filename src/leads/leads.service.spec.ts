import { Test } from '@nestjs/testing';
import { Lead } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { LeadsService } from './leads.service';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllLeadsDto } from './dto/findall-lead.dto';


function generateRandomLead(withId = true): Lead {
  let fakerPayload = {
    id: withId ? faker.number.int() : null,
    name: faker.person.fullName(),
    mail: faker.internet.email(),
    phone: faker.phone.number(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    gclid: faker.string.alphanumeric(),
    fbclid: faker.string.alphanumeric(),
    utmSource: faker.lorem.word(),
    utmCampaign: faker.lorem.word(),
    utmMedium: faker.lorem.word(),
    utmTerm: faker.lorem.word(),
    utmContent: faker.lorem.word(),
  };
  return fakerPayload
}

describe('LeadsService', () => {
  let leadsService: LeadsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LeadsService, PrismaService],
    }).compile();

    leadsService = moduleRef.get<LeadsService>(LeadsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    // Limpar todos os mocks após cada teste
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const createLeadInput = generateRandomLead();
      const mockLead = generateRandomLead(true);
      jest.spyOn(prismaService.lead, 'create').mockResolvedValue(mockLead);

      const result = await leadsService.create(createLeadInput);

      expect(prismaService.lead.create).toHaveBeenCalledWith({ data: createLeadInput });
      expect(result).toEqual(mockLead);
    });
  });

  describe('findAll', () => {
    it('should return an array of leads', async () => {
      const mockLeads = [generateRandomLead(true), generateRandomLead(true)];
      const params: FindAllLeadsDto = {}; // You can customize the params object if needed

      jest.spyOn(prismaService.lead, 'findMany').mockResolvedValue(mockLeads);

      const result = await leadsService.findAll(params);

      expect(prismaService.lead.findMany).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockLeads);
    });
  });

  describe('findOne', () => {
    it('should return a lead by ID', async () => {
      const mockLead = generateRandomLead(true);
      const leadId = 1;

      jest.spyOn(prismaService.lead, 'findUnique').mockResolvedValue(mockLead);

      const result = await leadsService.findOne(leadId);

      expect(prismaService.lead.findUnique).toHaveBeenCalledWith({ where: { id: leadId } });
      expect(result).toEqual(mockLead);
    });
  });

  describe('update', () => {
    it('should update a lead by ID', async () => {
      const mockLead = generateRandomLead(true);
      const leadId = 1;
      const updateLeadDto = { name: 'Updated Name' };

      jest.spyOn(prismaService.lead, 'update').mockResolvedValue(mockLead);

      const result = await leadsService.update(leadId, updateLeadDto);

      expect(prismaService.lead.update).toHaveBeenCalledWith({ where: { id: leadId }, data: updateLeadDto });
      expect(result).toEqual(mockLead);
    });
  });

  describe('remove', () => {
    it('should delete a lead by ID', async () => {
      const mockLead = generateRandomLead(true);
      const leadId = 1;

      jest.spyOn(prismaService.lead, 'delete').mockResolvedValue(mockLead);

      const result = await leadsService.remove(leadId);

      expect(prismaService.lead.delete).toHaveBeenCalledWith({ where: { id: leadId } });
      expect(result).toEqual(mockLead);
    });
  });
});
