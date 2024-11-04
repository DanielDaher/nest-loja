import { Module } from '@nestjs/common';
import { JwtAuthModule } from 'src/shared/services/jwt/jwt.module';
import { PasswordModule } from 'src/shared/services/password/password.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationDAO } from './authentication.dao';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [PasswordModule, JwtAuthModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationDAO],
})
export class AuthenticationModule {}
