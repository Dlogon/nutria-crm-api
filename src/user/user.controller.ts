import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';
import { User } from 'src/auth/decorators';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  @Get('me')
  getMe(@User() user) {
    return user;
  }
}
