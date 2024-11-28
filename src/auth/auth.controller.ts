import { Body, Controller, Post, HttpCode, HttpStatus, Request, SetMetadata, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/isPubic';
import { SinginDTO } from './dto/signin-dto';
import { CommonCerbosRequest } from 'src/common/decorators/common-cerbos.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SinginDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  
  @SetMetadata('resource', 'users')
  @CommonCerbosRequest()
  @Get('profile')
  profile(@Request() req) {
    return {
      userInfo: req.user,
    };
  }
}