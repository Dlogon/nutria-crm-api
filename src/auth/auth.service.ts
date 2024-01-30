import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as JWTConstants from './constants';
import { User } from './decorators';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const message = 'Invalid credentials';

    const user = await this.prisma.user.findUnique({
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
    refresh_token: string;
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
    };
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    return user;
  }

  refresh(@User() user) {
    return this.signToken(user.id, user.email);
  }
}
