import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { HttpModule } from '@nestjs/axios';
import { EnquiryModule } from './enquiry/enquiry.module';
import { EstimationModule } from './estimation/estimation.module';
import { CerbosModule } from './cerbos/cerbos.module';

@Module({
  imports: [
    HttpModule,
    KnexModule.forRoot({
      config: {
        client: "pg",
        connection: {
          host: '172.17.0.3',
          port: 5432,
          user: 'test',
          database: 'test',
          password: 'test_password',
        },
      },
    }),
    UsersModule,
    AuthModule,
    EnquiryModule,
    EstimationModule,
    CerbosModule,
  ],
  controllers: [AppController],
  providers: [ {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  AppService],
})
export class AppModule {}
