import { Prisma, PrismaClient } from '@prisma/client';

const user: Prisma.UserCreateInput = {
  email: 'user@getnada.com',
  name: 'testerson',
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });

  console.log('User seed OK.');
}
