import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/create-auth.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterAuthDocs, TokenAuthDocs } from './docs/response-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import type { Request, Response } from 'express';
import { Protected } from '../decorators/protected.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user account with provided credentials',
  })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: RegisterAuthDocs,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @Post('/register')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterAuthDto,
  ) {
    return this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password',
  })
  @ApiOkResponse({
    description: 'User successfully authenticated',
    type: TokenAuthDocs,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'User with provided email not found' })
  @Post('/login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginAuthDto) {
    return this.authService.login(res, dto);
  }

  @Protected()
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get new access token using refresh token from cookies',
  })
  @ApiOkResponse({
    description: 'Access token successfully refreshed',
    type: TokenAuthDocs,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is missing, expired or invalid',
  })
  @ApiNotFoundResponse({ description: 'User from token not found in database' })
  @Get('/refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @Protected()
  @ApiOperation({
    summary: 'User logout',
    description: 'Clear refresh token cookie and logout user',
  })
  @ApiOkResponse({
    description: 'User successfully logged out',
    schema: { example: true },
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @Get('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
