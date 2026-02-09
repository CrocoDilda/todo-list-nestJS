import { OmitType, PartialType } from '@nestjs/swagger';
import { ProfileUserDto } from './profile-user.dto';
import { IsOptional } from 'class-validator';
import { UserGender } from 'generated/prisma/enums';

export class UpdateUserDto extends PartialType(
  OmitType(ProfileUserDto, ['email'] as const),
) {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  age?: number;

  @IsOptional()
  password?: string;

  @IsOptional()
  gender: UserGender;
}
