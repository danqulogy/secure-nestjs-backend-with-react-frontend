import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { USER_MODEL_NAME} from './user.schema';
import {IUser, UserDocument} from "./user.document";
import {User} from "../domain/user.model";


@Injectable()
export class UsersRepository {
  constructor(@InjectModel(USER_MODEL_NAME)
              private model: Model<UserDocument>) {}




  async persist(user: User): Promise<UserDocument> {
    const data = this.convertUserModelToPlain(user)

    console.log('plain data', data)

    if(data._id){
      return this.model.findByIdAndUpdate(data._id, data).lean()
    }

    const doc = new this.model(data)
    await doc.save()

    return doc;
  }


  async findUserById(userId: string):  Promise<IUser>{
    return this.model.findById(userId).populate('_role').lean()
  }

  async findActiveUserByEmail(email): Promise<IUser>{
    return this.model.findOne({email}).lean()
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.model.find().lean()
  }

  private convertUserModelToPlain(user: User) {
    return {
      _id: user.id ? user.id.value: null,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value
    } as IUser
  }
}
