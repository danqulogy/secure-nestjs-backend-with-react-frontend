import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthUser } from './common/get-authed-user.decorator';
import { IUser } from './db/user.document';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(@GetAuthUser() user:IUser){
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string,  @GetAuthUser() user:IUser){
    return this.usersService.getUserById(id)
  }
}
