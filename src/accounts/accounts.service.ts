import { Injectable } from '@nestjs/common';
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

  findAll() {
    return {}; //this.prisma.account.findMany();
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

  findOne(id: number) {
    return {};
    // this.prisma.account.findUnique({
    //   where: {
    //     id: id,
    //   },
    // });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return {};
    // const acc = this.prisma.account.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     ...updateAccountDto,
    //   },
    // });
    // return acc;
  }

  remove(id: number) {
    return id;
  }
}
