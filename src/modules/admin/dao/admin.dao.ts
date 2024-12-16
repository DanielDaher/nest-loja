import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';

const adminSelect = {
  id: true,
  role: true,
  cpf: true,
  name: true,
  email: true,
  password: false,
  status: true,
  imageUrl: true,
  code: true,
  codeExpiresIn: true,
  createdAt: true,
  updatedAt: true,
  permissions: true,
} satisfies Prisma.AdminSelect;

@Injectable()
export class AdminDAO {
  constructor(private prisma: PrismaService) {}

  async findAll(size?: number, page?: number, search?: string) {
    const where: Prisma.AdminWhereInput = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { cpf: { contains: search } },
          ],
        }
      : {};

    const paginateData: boolean = Boolean(page && size);
    const pageCalculation = ((page || 1) - 1) * (size || 1);

    return this.prisma.$transaction([
      this.prisma.admin.findMany({
        where,
        take: paginateData ? size : undefined,
        skip: paginateData ? pageCalculation : undefined,
        select: adminSelect,
        orderBy: paginateData ? { createdAt: 'desc' } : undefined,
      }),
      this.prisma.admin.count({ where }),
    ]);
  }

  async findById(id: number) {
    return this.prisma.admin.findUnique({
      where: { id },
      select: adminSelect,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: { email },
      select: adminSelect,
    });
  }

  findByCredential(credential: string) {
    return this.prisma.admin.findFirst({
      where: {
        OR: [{ email: credential }, { cpf: credential }],
      },
    });
  }

  async findByCpf(cpf: string) {
    return this.prisma.admin.findUnique({
      where: { cpf },
      select: adminSelect,
    });
  }

  async create(data: CreateAdminDto) {
    const { permissionsIds, ...adminData } = data;
    return await this.prisma.$transaction(async (trx) => {
      return await trx.admin.create({
        select: adminSelect,
        data: {
          ...adminData,
          permissions: permissionsIds
            ? {
                connect: permissionsIds.map((permissionId) => ({
                  id: permissionId,
                })),
              }
            : undefined,
        },
      });
    });
  }

  async update(id: number, data: UpdateAdminDto) {
    const { permissionsIds, ...updateData } = data;
    return await this.prisma.$transaction(async (trx) => {
      return await trx.admin.update({
        select: adminSelect,
        where: { id },
        data: {
          ...updateData,
          permissions: permissionsIds
            ? {
                set: permissionsIds.map((permissionId) => ({
                  id: permissionId,
                })),
              }
            : undefined,
        },
      });
    });
  }

  async updateStatus(id: number, status: Prisma.AdminUpdateInput['status']) {
    return await this.prisma.admin.update({
      where: { id },
      data: { status },
      select: adminSelect,
    });
  }

  async remove(id: number) {
    return await this.prisma.admin.delete({
      where: { id },
      select: adminSelect,
    });
  }

  async validatePermissions(id: number) {
    return await this.prisma.permission.findUniqueOrThrow({
      where: { id },
    });
  }
}
