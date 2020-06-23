import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common'
import {Request} from 'express'
import {RegisterUserDto} from "./dtos/registerUserDto";
import {LoginCredentialsDto} from "./dtos/loginCredentialsDto";
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('register')
  async register(@Body() payload: RegisterUserDto){
    return this.authService.register(payload)
  }

  @Post('login')
  async login(@Body() payload: LoginCredentialsDto, @Req() request: Request){
    return this.authService.login(payload)
  }

}
