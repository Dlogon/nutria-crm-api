import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    return createAccountDto;
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  findOne(id: number) {
    return this.prisma.account.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const acc = this.prisma.account.update({
      where: {
        id: id,
      },
      data: {
        ...updateAccountDto,
      },
    });
    return acc;
  }

  remove(id: number) {
    return id;
  }
}
