import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const ROLE_KEY = 'ROLE';
export const SetRoles = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
