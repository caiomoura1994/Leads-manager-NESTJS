import { Injectable } from '@nestjs/common';
import { Lead, Prisma } from '@prisma/client';
import { FindAllLeadsDto } from './dto/findall-lead.dto';

@Injectable()
export class MockedLeadsService {
    constructor(private leads: Lead[] = []) { }
    async create(createLeadInput: Prisma.LeadCreateInput): Promise<Lead> {
        const id = this.leads.length + 1
        const newLead = { id, ...createLeadInput } as Lead
        this.leads.push(newLead)
        return newLead
    }

    async findAll(_params?: FindAllLeadsDto): Promise<Lead[]> {
        return this.leads
    }

    async findOne(id: number): Promise<Lead> {
        return this.leads.find(lead => lead.id === id)
    }

    async update(id: number, updateLeadDto: Prisma.LeadUpdateInput): Promise<Lead> {
        const findedLead = await this.findOne(id)
        return this.leads[findedLead.id - 1] = { ...updateLeadDto, id } as Lead
    }

    async remove(id: number): Promise<void> {
        this.leads.slice(id - 1, 1);
    }
}
