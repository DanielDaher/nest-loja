import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthenticationDAO {
  constructor(private prisma: PrismaService) {}

  getByCredential(credential: string) {
    return this.prisma.user.findUnique({
      where: {
        email: credential,
      },
    });
  }
}
