import {BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    const user = request.user
    if (!user)
      throw new InternalServerErrorException('User not found (request)')

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    if (!validRoles || !validRoles.length) return true

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true
      }
    }

    throw new BadRequestException(`User ${user.fullName} has not the required role for this action, roles accepted: ${validRoles}`);
  }
}
