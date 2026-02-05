import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from 'generated/prisma/enums';

export class UserResponse {
  @ApiProperty({
    description: 'User id',
    example: '367df3b0-be57-4d49-b5ec-56ab2826d862',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Alex',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'User email',
    example: 'alex@gmail.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'User age',
    example: 23,
    type: Number,
  })
  age: number;

  @ApiProperty({
    description: 'User gender',
    example: 'male',
    enum: UserGender,
    enumName: 'UserGender',
  })
  gender: UserGender;

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
