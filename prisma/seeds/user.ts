import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const user: Prisma.UserCreateInput = {
  email: 'user@getnada.com',
  name: 'testerson',
  cpf: '11111111111',
  password: hashPassword('123456789'),
  phone: '11111111111',
  addresses: {
    create: {
      zipcode: '12345-678',
      street: 'Example Street',
      number: '123',
      complement: 'Apt 4',
      district: 'Example District',
      city: 'Example City',
      state: 'EX',
    },
  },
  documents: {
    create: {
      fileUrl: 'path/to/file.pdf',
    },
  },
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });
  console.log('User seed OK.');
  console.log('Address seed OK.');
  console.log('Documents seed OK.');
}
