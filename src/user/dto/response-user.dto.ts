import { ApiProperty } from '@nestjs/swagger';
import { ProfileUserDto } from './profile-user.dto';

export class ResponseUserDto extends ProfileUserDto {
  @ApiProperty({
    description: 'User id',
    example: '367df3b0-be57-4d49-b5ec-56ab2826d862',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Create date',
    example: '2026-02-05T11:48:59.243Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Update date',
    example: '2026-02-05T11:49:18.990Z',
    type: Date,
  })
  updatedAt: Date;
}
