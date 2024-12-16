import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminDAO } from './dao/admin.dao';
import { PasswordService } from 'src/shared/services/password/password.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminDAO, PasswordService],
})
export class AdminModule {}
