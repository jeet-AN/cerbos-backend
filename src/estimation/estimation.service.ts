import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { UpdateEstimationDto } from './dto/update-estimation.dto';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { Estimation } from './entities/estimation.entity';

@Injectable()
export class EstimationService {
  private knexRef;

  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {
    this.knexRef = this.knex<Estimation>('estimation')
  }

  async create(payload: CreateEstimationDto, user_id) {
    payload.employee_id = user_id;
    let result = await this.knexRef.insert(payload);
    return result;
  }

  async findAll() {
    let result = await this.knexRef;
    return result;
  }

  async findOne(id: number) {
    let result = await this.knexRef.where('id', id).first();
    if(!result) throw new NotFoundException();
    return result;
  }

  update(id: number, updateEstimationDto: UpdateEstimationDto) {
    return `This action updates a #${id} enquiry`;
  }

  remove(id: number) {
    return `This action removes a #${id} enquiry`;
  }
}
