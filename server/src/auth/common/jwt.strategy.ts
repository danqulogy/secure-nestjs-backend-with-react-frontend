import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt} from 'passport-jwt'
import {  Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersRepository} from "../db/users.repository";
import {environment} from "../../environment";
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.auth.secret
    });
  }

  async validate(payload: JwtPayload){
    const user = await this.usersRepository.findActiveUserByEmail(payload.email)
    if(!user) {
      throw new UnauthorizedException(`Unauthorized access.`)
    }
    return user
  }
}
