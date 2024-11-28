import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {
  }

  async create(payload: CreateUserDto) {
    let result = await this.knex<User>('users').insert(payload);
    return "Success";
  }
  
  async getSubEmployees(id: number) {
    return await this.knex<User>('users').where('supervisor_id', id);
  }

  async findAll() {
    let results = await this.knex<User>('users');
    return results;
  }

  async search(email: string): Promise<User> {
    let result = await this.knex<User>('users')
      .where('email', email)
      .first();
    return result;
  }

  async findOne(id: number) {
    let result = await this.knex<User>('users')
      .where('id', id)
      .first();
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
