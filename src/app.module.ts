import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './database/prisma.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule,
    UserModule,
    AddressModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
