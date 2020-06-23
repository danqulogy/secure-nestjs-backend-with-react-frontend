import {Schema} from 'mongoose'

export const USER_MODEL_NAME = 'User'


export const UserSchema = new Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String},
}, {timestamps: true})


