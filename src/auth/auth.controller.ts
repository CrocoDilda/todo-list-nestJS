import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResponseAuthCreate, TokenAuthDto } from './dto/response-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Create a new user',
    description:
      'Creates a new user with provided data. All fields are required.',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: ResponseAuthCreate,
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
    summary: 'Create a new user',
    description:
      'Creates a new user with provided data. All fields are required.',
  })
  @ApiOkResponse({ description: 'User is found', type: TokenAuthDto })
  @ApiBadRequestResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'User not found' })
  @Post('/login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginAuthDto) {
    return this.authService.login(res, dto);
  }
}
