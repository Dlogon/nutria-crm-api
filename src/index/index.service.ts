import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  sayHello() {
    return {
      message: 'Hello from nutria crm api',
    };
  }
}
