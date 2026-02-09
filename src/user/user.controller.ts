import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'The method returns all users',
  })
  @ApiOkResponse({ description: 'Users found', type: [ResponseUserDto] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Get user by id',
    description: 'The method returns unique user',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'User id' })
  @ApiOkResponse({ description: 'User found', type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Editing a user by id',
    description: 'Method for editing a user by id',
  })
  @ApiOkResponse({ description: 'User found', type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Remove a user by id',
    description: 'Method for removed a user by id',
  })
  @ApiOkResponse({ description: 'User found', type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
