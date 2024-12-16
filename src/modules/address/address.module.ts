import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressDAO } from './dao/address.dao';
import { UserService } from '../user/user.service';
import { UserDAO } from '../user/user.dao';
import { PasswordService } from 'src/shared/services/password/password.service';

@Module({
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressDAO,
    UserService,
    UserDAO,
    PasswordService,
  ],
})
export class AddressModule {}
