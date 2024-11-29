import { AccountStatus, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  imageUrl: true,
  status: true,
  addresses: true,
  documents: true,
  payments: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UserDAO {
  constructor(private prisma: PrismaService) {}

  findAll(size?: number, page?: number, search?: string) {
    const where: Prisma.UserWhereInput = {
      AND: [
        { role: 'USER' },
        {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        },
      ],
    };

    const paginateData: boolean = Boolean(page && size);

    return this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        take: paginateData ? size : undefined,
        skip: paginateData ? (page - 1) * size : undefined,
        select: userSelect,
        orderBy: paginateData ? { createdAt: 'desc' } : undefined,
      }),
      this.prisma.user.count({ where }),
    ]);
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id, role: 'USER' },
      select: userSelect,
    });
  }

  findByCredential(credential: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: credential }, { phone: credential }, { cpf: credential }],
      },
    });
  }

  async create(data: CreateUserDto) {
    const { address, ...createData } = data;
    console.log(data);
    console.log('address: ', address);

    return await this.prisma.$transaction(async (trx) => {
      return await trx.user.create({
        select: userSelect,
        data: {
          ...createData,
          role: 'USER',
          addresses: {
            create: {
              ...address,
              zipcode: address.zipcode,
            },
          },
        },
      });
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

  async updateStatus(id: number, status: AccountStatus) {
    return await this.prisma.$transaction(async (trx) => {
      return await trx.user.update({
        where: { id },
        data: { status },
        select: userSelect,
      });
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
      select: userSelect,
    });
  }
}
