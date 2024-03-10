import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { Account } from '@app/accounts/entities/account.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<{ id: number }> {
    const lead = await this.leadRepository.create({ ...createLeadDto });
    await this.leadRepository.save(lead);
    return { id: lead.id };
  }

  findAll() {
    return this.leadRepository.find({});
  }

  async findOne(id: number) {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) throw new NotFoundException();
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    let lead = await this.findOne(id);
    if (!lead) throw new NotFoundException('Record not found');

    lead = await this.leadRepository.save({
      id: id,
      ...updateLeadDto,
    });
    return lead;
  }

  async remove(id: number) {
    const leadDeleteResult = await this.leadRepository.softDelete(id);
    if (!leadDeleteResult.affected) {
      throw new NotFoundException('Can not delete this record');
    }
    return {};
  }

  async convertLeadToAccount(id: number) {
    let lead = await this.leadRepository.findOneBy({ id });
    const acc = await lead.account;
    if (!lead) throw new NotFoundException('Record not found');
    if (acc) throw new BadRequestException('This lead has been converted');

    const newAcc = new Account();

    newAcc.firsName = lead.firsName;
    newAcc.lastName = lead.lastName;
    newAcc.mobilePhone = lead.mobilePhone;
    newAcc.officePhone = lead.officePhone;

    lead = await this.leadRepository.save({
      id: id,
      account: newAcc,
    });
  }
}
