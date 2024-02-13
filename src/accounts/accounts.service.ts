import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor() {}

  async create(createAccountDto: CreateAccountDto) {
    return createAccountDto;
  }

  findAll() {
    return {}; //this.prisma.account.findMany();
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
