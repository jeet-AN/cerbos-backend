import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { Enquiry } from './entities/enquiry.entity';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {
  }

  async create(payload: CreateEnquiryDto, user_id) {
    payload.employee_id = user_id;
    let result = await this.knex<Enquiry>('enquiry').insert(payload);
    return result;
  }

  async findAll() {
    let result = await this.knex<Enquiry>('enquiry');
    return result;
  }

  async findOne(id: number) {
    let result = await this.knex<Enquiry>('enquiry').where('id', id).first();
    if(!result) throw new NotFoundException();
    return result;
  }

  update(id: number, updateEnquiryDto: UpdateEnquiryDto) {
    return `This action updates a #${id} enquiry`;
  }

  remove(id: number) {
    return `This action removes a #${id} enquiry`;
  }
}
