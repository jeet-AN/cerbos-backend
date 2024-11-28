
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,

} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { IS_PUBLIC_KEY } from '../../common/isPubic';
import { Reflector } from '@nestjs/core';
import { IS_COMMON_CERBOS_REQUEST } from 'src/common/decorators/common-cerbos.decorator';
import { CerbosService } from 'src/cerbos/cerbos.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private readonly cerbosService: CerbosService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // If public page then allow routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // if not check jwt key validation
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    const isCommonCerbosReq = this.reflector.getAllAndOverride<boolean>(IS_COMMON_CERBOS_REQUEST, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isCommonCerbosReq) { // if not then return jwt success message
      return true
    }

    // check cerbos validation
    const resource = this.reflector.getAllAndOverride<string>('resource', [
      context.getHandler(),
      context.getClass(),
    ]); 
    const action = request.method.toLowerCase(); // 'get' -> read, 'post' -> write, 'put' -> update , 'delete' -> remove 
    return this.cerbosService.commonVerify(payload, resource, action);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
