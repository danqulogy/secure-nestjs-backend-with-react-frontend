import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './db/users.repository';
import { IUser } from './db/user.document';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {

  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<UserDto[]>{
    const usersList = await this.usersRepository.getAllUsers()
    return usersList.map(user => this.convertToUserDto(user))
  }

  async getUserById(id: string): Promise<UserDto>{
    const user = await this.usersRepository.findUserById(id)

    if(!user){
      throw new BadRequestException('User not found')
    }

    return this.convertToUserDto(user)
  }

  private convertToUserDto(user: IUser): UserDto{
    return {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
}