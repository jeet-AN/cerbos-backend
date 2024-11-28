import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class AppService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
