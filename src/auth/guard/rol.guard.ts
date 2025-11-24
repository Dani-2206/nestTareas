import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { ROLES_KEY } from '../decorators/Role.decorator';

@Injectable()
export class RolGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

   
    if (!user || user.rol !== requiredRole) {
     
      throw new ForbiddenException(`Acceso denegado. Se requiere el rol: ${requiredRole}. Tu rol actual es: ${user ? user.rol : 'ninguno'}.`);
    }

    return true; 
  }
}