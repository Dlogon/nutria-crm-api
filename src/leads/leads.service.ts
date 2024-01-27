import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        ...createLeadDto,
      },
    });
    return lead;
  }

  findAll() {
    return this.prisma.lead.findMany();
  }

  findOne(id: number) {
    return this.prisma.lead.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    const lead = this.prisma.lead.update({
      where: {
        id: id,
      },
      data: {
        ...updateLeadDto,
      },
    });
    return lead;
  }

  remove(id: number) {
    return id;
  }
}