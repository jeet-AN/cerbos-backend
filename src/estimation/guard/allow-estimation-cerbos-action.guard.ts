import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { Reflector } from '@nestjs/core';
import { CerbosService } from 'src/cerbos/cerbos.service';
import { Estimation } from '../entities/estimation.entity';

@Injectable()
export class AllowEstimationCerbosAction implements CanActivate {
    private knexRef;
    constructor(private reflector: Reflector, @InjectKnex() private readonly knex: Knex, private cerbosService: CerbosService) {
        this.knexRef = this.knex<Estimation>('estimation')
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = request.params.id;
        const resource = this.reflector.getAllAndOverride<string>('resource', [
            context.getHandler(),
            context.getClass(),
        ]);

        let response = await this.knexRef.where('id', id);
        if (!response || !response?.length) {
            throw new NotFoundException();
        }
        let record = response[0];
        const action = request.method.toLowerCase(); // 'get' -> read, 'post' -> write, 'put' -> update , 'delete' -> remove
        let user = request.user;
        
        return this.cerbosService.updateAction(user, resource, action, record);

        
    }
}