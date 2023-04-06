import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return user;
    }
    
    const hasRole = () => roles.includes(user.rol);
    if (user && user.rol && hasRole()) {
      return true;
    } else {
      throw new ForbiddenException('No tiene permiso para acceder a este recurso');
    }
  }
}