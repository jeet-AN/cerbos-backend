
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { UserRole } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(id: string, pass: string): Promise<any> {
    const user = await this.usersService.search(id);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    let sub_employees: any = [];
    if(user.role === UserRole.MANAGER){
      let list = await this.usersService.getSubEmployees(user.id)
      sub_employees = list.map((e) => e.id);
    }
    const { password, ...result } = user;
    const payload = { 
      id: user.id, 
      role: user.role, 
      email: user.email,
      phone: user.phone,
      sub_employees
    };
    return {
      userInfo: {
        id: user.id,
        role: user.role,
        email: user.email,
        phone: user.phone,
        sub_employees
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
