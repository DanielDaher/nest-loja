import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  profilePicture: true,
  active: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UserDAO {
  constructor(private prisma: PrismaService) {}

  findAll(q?: string) {
    return this.prisma.user.findMany({
      where: {
        AND: [
          { role: 'USER' },
          { OR: [{ name: { contains: q } }, { email: { contains: q } }] },
        ],
      },
      select: userSelect,
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id, role: 'USER' },
      select: userSelect,
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        role: 'USER',
        active: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.prisma.$transaction(async (trx) => {
      return await trx.user.update({
        where: { id },
        data: {
          ...data,
          role: 'USER',
        },
        select: userSelect,
      });
    });
  }

  async updateStatus(id: number, status: boolean) {
    return await this.prisma.$transaction(async (trx) => {
      return await trx.user.update({
        where: { id },
        data: { active: status },
        select: userSelect,
      });
    });

    // return this.prisma.user.update({
    //   where: { id },
    //   data: { active: status },
    //   select: userSelect,
    // });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
      select: userSelect,
    });
  }
}
