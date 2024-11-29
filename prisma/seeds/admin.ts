import {
  Prisma,
  PrismaClient,
  AccountRole,
  AccountStatus,
  Permissions,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const admin: Prisma.AdminCreateInput = {
  role: AccountRole.ADMIN,
  name: 'Admin Master',
  email: 'admin@getnada.com',
  cpf: '111.111.111-11',
  password: hashPassword('123456789'),
  status: AccountStatus.ACTIVE,
};

export async function seedAdmin(prisma: PrismaClient) {
  const newAdmin = await prisma.admin.create({
    data: admin,
  });

  for (const permission of Object.values(Permissions)) {
    await prisma.permission.create({
      data: {
        title: permission,
        admins: {
          connect: { id: newAdmin.id },
        },
      },
    });
  }

  console.log('Admin user seed OK.');
}
