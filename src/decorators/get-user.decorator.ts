import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const user = request.user;

    if (!user) throw new NotFoundException('User not found');

    return data ? user[data] : user;
  },
);
