import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthenticationDAO {
  constructor(private prisma: PrismaService) {}

  getByCredential(credential: string, isAdmin?: boolean) {
    const where = { email: credential };

    if (isAdmin) {
      return this.prisma.admin.findUnique({
        where,
      });
    }

    return this.prisma.user.findUnique({
      where,
    });
  }
}
