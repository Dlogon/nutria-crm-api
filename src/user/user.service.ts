import { User } from '@app/auth/decorators';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserService {
  private user: any;
  //   constructor(@Inject(REQUEST) private request: any) {}
  setUser(user: any) {
    this.user = user;
  }
  getUsername(): any {
    return this.user;
  }
}
