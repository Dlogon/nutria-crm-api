import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as JWTConstants from './constants';
import { User as UserLoged } from './decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User as userEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable({})
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(userEntity)
    private usersRepository: Repository<userEntity>,
  ) {}

  async login(dto: LoginDto) {
    const message = 'Invalid credentials';
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException(message);

    const pwMatch = await argon.verify(user.hash, dto.password);
    if (!pwMatch) throw new ForbiddenException(message);

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{
    access_token: string;
    access_token_ttl: number;
    refresh_token: string;
    refresh_token_ttl: number;
  }> {
    const tokenData = {
      sub: userId,
      email,
    };

    const secret = this.config.get(JWTConstants.JWT_SECRET_ENV);
    const refreshSecret = this.config.get(JWTConstants.JWT__REFRESH_SECRET_ENV);

    const token = await this.jwt.signAsync(tokenData, {
      expiresIn: JWTConstants.JWT_TTL,
      secret: secret,
    });
    const refreshToken = await this.jwt.signAsync(tokenData, {
      expiresIn: JWTConstants.JWT__REFRESH_TTL,
      secret: refreshSecret,
    });

    return {
      access_token: token,
      refresh_token: refreshToken,
      access_token_ttl: JWTConstants.JWT_TTL,
      refresh_token_ttl: JWTConstants.JWT__REFRESH_TTL,
    };
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.usersRepository.create({
      email: dto.email,
      hash,
    });
    await this.usersRepository.save(user);

    return user;
  }

  refresh(@UserLoged() user) {
    return this.signToken(user.id, user.email);
  }
}
