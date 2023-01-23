import { Prisma } from '@prisma/client';

export class FindAllLeadsDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.LeadWhereUniqueInput;
  where?: Prisma.LeadWhereInput;
  orderBy?: Prisma.LeadOrderByWithRelationInput;
}
