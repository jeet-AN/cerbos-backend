import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { Enquiry } from '../entities/enquiry.entity';
import { Reflector } from '@nestjs/core';
import { CerbosService } from 'src/cerbos/cerbos.service';

@Injectable()
export class AllowEnquiryCerbosAction implements CanActivate {
    private knexRef;
    constructor(private reflector: Reflector, @InjectKnex() private readonly knex: Knex, private cerbosService: CerbosService) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = request.params.id;
        this.knexRef = this.knex<Enquiry>('enquiry')
        
        const resource = this.reflector.getAllAndOverride<string>('resource', [
            context.getHandler(),
            context.getClass(),
        ]);

        let response = await this.knexRef.where('id', +id);
        console.log("response", response, id);
        
        if (!response?.length) {
            throw new NotFoundException();
        }
        let record = response[0];
        const action = request.method.toLowerCase(); // 'get' -> read, 'post' -> write, 'put' -> update , 'delete' -> remove
        let user = request.user;

        return this.cerbosService.updateAction(user, resource, action, record);        
    }
}