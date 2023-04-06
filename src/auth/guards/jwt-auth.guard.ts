import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

interface HandleRequestResponse  extends Request {
  user: any;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const authenticated = await super.canActivate(context); // call passport.authenticate('jwt') y valida el token, si es valido retorna true, si no false

    if (!authenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return user;
    }
    
    const hasRole = () => roles.includes(user.rol);
    if (user && user.rol && hasRole()) {
      return user;
    } else {
      throw new ForbiddenException('No tiene permiso para acceder a este recurso');
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('No autorizado');
    }
    return user;
  }
}