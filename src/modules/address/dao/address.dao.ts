import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNewAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

const addressSelect = {
  id: true,
  userId: true,
  zipcode: true,
  street: true,
  number: true,
  complement: true,
  district: true,
  city: true,
  state: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AddressSelect;

@Injectable()
export class AddressDAO {
  constructor(private prisma: PrismaService) {}

  async findAll(size?: number, page?: number, search?: string) {
    const where: Prisma.AddressWhereInput = search
      ? {
          OR: [
            { street: { contains: search } },
            { city: { contains: search } },
            { state: { contains: search } },
            { district: { contains: search } },
            { zipcode: { contains: search } },
          ],
        }
      : {};

    const paginateData: boolean = Boolean(page && size);
    const pageCalculation = ((page || 1) - 1) * (size || 1);

    return this.prisma.$transaction([
      this.prisma.address.findMany({
        where,
        take: paginateData ? size : undefined,
        skip: paginateData ? pageCalculation : undefined,
        select: addressSelect,
        orderBy: paginateData ? { createdAt: 'desc' } : undefined,
      }),
      this.prisma.address.count({ where }),
    ]);
  }

  async findById(id: number) {
    return this.prisma.address.findUnique({
      where: { id },
      select: addressSelect,
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.address.findMany({
      where: { userId },
      select: addressSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateNewAddressDto) {
    const { userId, ...addressData } = data;
    return await this.prisma.$transaction(async (trx) => {
      return await trx.address.create({
        select: addressSelect,
        data: {
          ...addressData,
          user: { connect: { id: userId } },
        },
      });
    });
  }

  async update(id: number, data: UpdateAddressDto) {
    const { userId, ...updateData } = data;
    return await this.prisma.$transaction(async (trx) => {
      return await trx.address.update({
        select: addressSelect,
        where: { id },
        data: {
          ...updateData,
          user: userId ? { connect: { id: userId } } : undefined,
        },
      });
    });
  }

  async remove(id: number) {
    return await this.prisma.address.delete({
      where: { id },
      select: addressSelect,
    });
  }
}
