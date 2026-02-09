import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtCustomService } from './jwt-custom.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule, PassportModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [JwtCustomService, JwtStrategy],
  exports: [JwtModule],
})
export class GlobalJwtModule {}
