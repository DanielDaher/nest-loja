import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountRole } from '@prisma/client';
import { ROLE_KEY } from '../decorators/set-role.decorator';
import ErrorMessages from 'src/errors/error-messages';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<AccountRole[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const unspecifiedRoles = !requiredRoles.length;
    if (unspecifiedRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(ErrorMessages.FORBIDDEN);
    }
    return hasRole;
  }
}
