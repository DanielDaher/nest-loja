import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDAO } from './user.dao';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDAO],
})
export class UserModule {}
