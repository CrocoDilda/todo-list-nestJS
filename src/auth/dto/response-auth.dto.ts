import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';

export class TokenAuthDto {
  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxNWMyMzFlLWIwZmEtNDE3My04NDdkLWE4MDcxYWRkNDQ0MiIsImlhdCI6MTc3MDM4Mjc5NywiZXhwIjoxNzcwOTg3NTk3fQ.hjDLXfBXfMNKbaFICxTBlMXpDdjc-YT3WuGjTMfKu0s',
    type: String,
  })
  refreshToken: string;
}

export class ResponseAuthCreate extends TokenAuthDto {
  @ApiProperty({ type: ResponseUserDto })
  data: ResponseUserDto;
}
