import { Injectable } from '@nestjs/common';
import { Lead, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllLeadsDto } from './dto/findall-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) { }
  async create(createLeadInput: Prisma.LeadCreateInput): Promise<Lead> {
    return this.prisma.lead.create({ data: createLeadInput })
  }

  async findAll(params?: FindAllLeadsDto): Promise<Lead[]> {
    return this.prisma.lead.findMany(params)
  }

  async findOne(id: number): Promise<Lead> {
    return this.prisma.lead.findUnique({ where: { id } })
  }

  async update(id: number, updateLeadDto: Prisma.LeadUpdateInput): Promise<Lead> {
    return this.prisma.lead.update({ where: { id }, data: updateLeadDto })
  }

  async remove(id: number): Promise<Lead> {
    return this.prisma.lead.delete({ where: { id } });
  }
}
