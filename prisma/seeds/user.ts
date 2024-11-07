import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const user: Prisma.UserCreateInput = {
  name: 'testerson',
  phone: '1112345678',
  email: 'user@getnada.com',
  password: hashPassword('123456789'),
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });

  console.log('User seed OK.');
}
