import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { UserGender } from 'generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @ApiProperty({
    description: 'User name',
    example: 'Alex',
    type: String,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
    type: String,
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'User email',
    example: 'alex.smith@example.com',
    type: String,
  })
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'User password',
    example: 'af234fdfDFfdas*Fdef',
    type: String,
  })
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male',
    enum: UserGender,
    enumName: 'UserGender',
  })
  @IsOptional()
  gender: UserGender;
}
