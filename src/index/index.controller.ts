import { Controller, Get } from '@nestjs/common';
import { IndexService } from './index.service';

@Controller('')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  sayHeloo() {
    return this.indexService.sayHello();
  }
}
