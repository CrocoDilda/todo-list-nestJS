import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { isDev } from 'src/utils/is-dev.utils';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: number;
  private readonly JWT_REFRESH_TOKEN_TTL: number;

  private readonly COOKIE_DOMAIN: string;

  private readonly isDevMod: boolean;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = +config.getOrThrow('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = +config.getOrThrow('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = config.getOrThrow('COOKIE_DOMAIN');
    this.isDevMod = isDev(this.config);
  }

  async register(res: Response, dto: RegisterAuthDto) {
    try {
      const user = await this.prisma.user.create({
        data: { ...dto, password: await hash(dto.password) },
        omit: { password: true },
      });

      const { accessToken } = this.auth(res, user!.id);

      return { data: user, accessToken };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      )
        throw new ConflictException('User with this email already exists');
      throw e;
    }
  }

  async login(res: Response, dto: LoginAuthDto) {
    try {
      const { email } = dto;
      const user = await this.prisma.user.findUnique({ where: { email } });

      const isValidPassword = await verify(user!.password, dto.password);

      if (!isValidPassword) throw new NotFoundException('User not found');

      return this.auth(res, user!.id);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      )
        throw new NotFoundException('User not found');
      throw e;
    }
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(this.JWT_REFRESH_TOKEN_TTL + Date.now()),
    );

    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !this.isDevMod,
      sameSite: this.isDevMod ? 'none' : 'lax',
    });
  }
}
