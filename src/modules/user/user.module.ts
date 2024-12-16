import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDAO } from './user.dao';
import { PasswordService } from 'src/shared/services/password/password.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDAO, PasswordService],
})
export class UserModule {}
