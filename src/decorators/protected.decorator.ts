import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/config/guards/auth.guard';

export const Protected = () =>
  applyDecorators(
    UseGuards(JwtGuard),
    ApiBearerAuth(),
    ApiSecurity('bearer'),
    ApiUnauthorizedResponse({
      description: 'User is not authenticated or token is invalid',
    }),
  );
