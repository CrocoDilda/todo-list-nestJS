import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDocs } from 'src/user/docs/response-user.docs';

export class TokenAuthDocs {
  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxNWMyMzFlLWIwZmEtNDE3My04NDdkLWE4MDcxYWRkNDQ0MiIsImlhdCI6MTc3MDM4Mjc5NywiZXhwIjoxNzcwOTg3NTk3fQ.hjDLXfBXfMNKbaFICxTBlMXpDdjc-YT3WuGjTMfKu0s',
    type: String,
  })
  refreshToken: string;
}

export class RegisterAuthDocs extends TokenAuthDocs {
  @ApiProperty({ type: ResponseUserDocs })
  data: ResponseUserDocs;
}
