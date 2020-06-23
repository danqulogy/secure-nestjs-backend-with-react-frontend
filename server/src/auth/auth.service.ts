import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import {User} from "./domain/user.model";
import {UsersRepository} from "./db/users.repository";
import { RegisterUserDto } from './dtos/registerUserDto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto, AuthUserDto } from './dtos/auth-response.dto';
import { JwtPayload } from './common/jwt-payload';
import { LoginCredentialsDto } from './dtos/loginCredentialsDto';

@Injectable()
export class AuthService{
    constructor(private usersRepository: UsersRepository,
                private jwtService: JwtService) {}

    async register(payload: RegisterUserDto): Promise<void> {
        const { name, email, password } = payload
        await this.checkIfUserEmailAlreadyExist(email)
        const user = new User({name, email, password})
        console.log(user)
        await this.usersRepository.persist(user)
    }

    async login(credentials: LoginCredentialsDto): Promise<AuthResponseDto> {

        const exist = await this.usersRepository.findActiveUserByEmail(credentials.email)
        if(!exist){
            throw new UnauthorizedException(`Unauthorized credentials. User does not exist`)
        }

        const user = new User(exist)

        if(!user.password.matches(credentials.password)){
            throw new UnauthorizedException(`Unauthorized credentials. Incorrect password`)
        }

        const payload:JwtPayload = {
            id: user.id.value,
            name: user.name.value,
            email: user.email.value,
        }

        const accessToken = this.jwtService.sign(payload)

        const authUser:AuthUserDto = {
            _id: user.id.value,
            displayName: user.name.value,
            email: user.email.value
        }

        return {token: accessToken}

    }


    private async checkIfUserEmailAlreadyExist(employeeId: string) {
        const exist = await this.usersRepository.findActiveUserByEmail(employeeId)
        if(exist){
            throw new BadRequestException(`Specified user's email is already taken`)
        }
    }


}
