import {Document} from "mongoose";

export interface IUser {
    _id?: string
    name: string
    email: string
    password: string
}

export class UserDocument extends Document implements IUser{
    name: string
    email: string
    password: string
}