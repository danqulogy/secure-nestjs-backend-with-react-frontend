import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {environment} from "./environment";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
      MongooseModule.forRoot(environment.mongo_url),
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
