
import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  @Injectable()
  export class CommonCerbosGuard implements CanActivate {
    constructor() { }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      return false;
    }
}
  