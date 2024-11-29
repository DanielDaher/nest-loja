import { PrismaClient } from '@prisma/client';
import { seedUser } from './user';
import { seedAdmin } from './admin';

const prisma = new PrismaClient();
async function main() {
  await seedUser(prisma);
  await seedAdmin(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
