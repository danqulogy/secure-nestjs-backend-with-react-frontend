import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from "mongoose";
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationError, ValidationPipe} from "@nestjs/common";
import { ValidationException } from './common/filters/validation.exception';
import { GlobalFallbackFilter } from './common/filters/global-fallback.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationFilter } from './common/filters/validation.filter';


mongoose.set('useCreateIndex', true)

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

    // Global pipes
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,

        exceptionFactory: (errors: ValidationError[]) => {
          const messages = errors.map(error => `${Object.values(error.constraints).join(',')}`)
          return new ValidationException(messages)
        },
      }),
  )

  // Global exception filters for proper formatting of errors & exceptions
  app.useGlobalFilters(
      new GlobalFallbackFilter(),
      new HttpExceptionFilter(),
      new ValidationFilter()
  )


    const port = process.env.port || 3333
    await app.listen(port, () => {
     console.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    })
}


bootstrap().then(r => console.log('Application started'))
