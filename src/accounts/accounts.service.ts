import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { PaginationOptions, Pagination } from '@common/pagination';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = await this.accountRepository.create({ ...createAccountDto });
    await this.accountRepository.save(account);
    return { id: account.id };
  }

  async findAll() {
    return this.accountRepository.find();
  }

  async findPaginated(paginationOptions: PaginationOptions) {
    const [results, total] = await this.accountRepository.findAndCount({
      take: paginationOptions.limit,
      skip: paginationOptions.page * paginationOptions.limit,
      order: {
        createdAt: paginationOptions.order,
      },
    });
    return new Pagination<Account>(results, total);
  }

  async findById(id: number) {
    const acc = await this.accountRepository.findOneBy({ id });
    if (!acc) throw new NotFoundException();
    return acc;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    let acc = await this.findById(id);
    if (!acc) throw new NotFoundException('Record not found');

    acc = await this.accountRepository.save({
      id: id,
      ...updateAccountDto,
    });
    return acc;
  }

  async remove(id: number) {
    const deleted = await this.accountRepository.softDelete(id);
    if (!deleted.affected) {
      throw new NotFoundException('Can not delete this record');
    }
    return {};
  }
}
