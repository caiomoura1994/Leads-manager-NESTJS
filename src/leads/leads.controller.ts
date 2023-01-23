import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LeadsService } from './leads.service';
import { Prisma } from '@prisma/client';
import { FindAllLeadsDto } from './dto/findall-lead.dto';

@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  @MessagePattern('createLead')
  create(@Payload() createLeadDto: Prisma.LeadCreateInput) {
    return this.leadsService.create(createLeadDto);
  }

  @MessagePattern('findAllLeads')
  findAll(params: FindAllLeadsDto) {
    return this.leadsService.findAll(params);
  }

  @MessagePattern('findOneLead')
  findOne(@Payload() id: number) {
    return this.leadsService.findOne(id);
  }

  @MessagePattern('updateLead')
  update(@Payload() id: number, updateLeadDto: Prisma.LeadUpdateInput) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @MessagePattern('removeLead')
  remove(@Payload() id: number) {
    return this.leadsService.remove(id);
  }
}
