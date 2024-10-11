import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
