import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  @Get('me')
  getMe() {
    return 'its Me';
  }
}
