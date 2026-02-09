import { PickType } from '@nestjs/swagger';
import { ProfileUserDto } from 'src/user/dto/profile-user.dto';

export class LoginAuthDto extends PickType(ProfileUserDto, [
  'email',
  'password',
] as const) {}
