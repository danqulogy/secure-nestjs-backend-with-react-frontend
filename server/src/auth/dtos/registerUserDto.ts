import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8, 50)
    password: string
}