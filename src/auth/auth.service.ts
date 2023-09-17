import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credenziali sbagliate');
    }

    const isPaswordCorretta = await argon.verify(user.hash, dto.password);

    if (!isPaswordCorretta) {
      throw new ForbiddenException('Credenziali sbagliate');
    }
    return this.signToken(user.id.toString(), user.email);
  }

  async signup(dto: AuthDto) {
    //generare la psw
    const hash = await argon.hash(dto.password);
    //salvare il nuovo user a db

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(user.id.toString(), user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credenziali già esistenti');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload, {
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
