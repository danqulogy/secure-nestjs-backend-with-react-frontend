import { JwtStrategy } from './common/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from './auth.service';
import {AuthController} from "./auth.controller";
import {environment} from "../environment";
import {UsersRepository} from "./db/users.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {USER_MODEL_NAME, UserSchema} from "./db/user.schema";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: USER_MODEL_NAME, schema: UserSchema}
    ]),
    CqrsModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: environment.auth.secret,
      signOptions: {
        expiresIn: environment.auth.jwtExpiresIn
      }
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    UsersRepository
  ],
  controllers: [AuthController, UsersController],
  exports:[PassportModule, JwtModule]
})
export class AuthModule {

}
