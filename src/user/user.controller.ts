import { Controller, Get, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseUserDocs } from './docs/response-user.docs';
import { Protected } from 'src/decorators/protected.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ type: ResponseUserDocs })
  @Get()
  getProfile(@GetUser('id') id: string) {
    return this.userService.findOne(id);
  }

  @Protected()
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Updates only provided fields. Email cannot be changed.',
  })
  @ApiOkResponse({ type: ResponseUserDocs })
  @Patch()
  updateProfile(@GetUser('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Protected()
  @ApiOperation({
    summary: 'Delete user account',
    description: '⚠️ This action is permanent and cannot be undone',
  })
  @ApiOkResponse({ type: ResponseUserDocs })
  @Delete()
  deleteAccount(@GetUser('id') id: string) {
    return this.userService.remove(id);
  }
}
