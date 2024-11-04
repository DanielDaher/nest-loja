import { UserRole } from '@prisma/client';

export interface IPayload {
  sub: string;
  role: UserRole;
}
