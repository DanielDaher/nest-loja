import { AccountRole } from '@prisma/client';

export interface IPayload {
  sub: string;
  role: AccountRole;
}
