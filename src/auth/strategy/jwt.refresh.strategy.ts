import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT__REFRESH_SECRET_ENV } from '../constants/index';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh'),
      ignoreExpiration: false,
      secretOrKey: config.get(JWT__REFRESH_SECRET_ENV),
    });
    console.log(this.name);
  }

  validate(payload: any) {
    return payload;
  }
}
