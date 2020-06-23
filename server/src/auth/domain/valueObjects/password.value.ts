import * as bcrypt from 'bcrypt'
import { BadRequestException } from '@nestjs/common'
import {ValueObject} from "../../../common";


export class Password extends ValueObject<string>{
  readonly plainPassword: string
  readonly isPasswordSet: boolean

  private constructor(plain: string, hash: string) {
    super()
    this.plainPassword = plain
    this.value = hash
    this.isPasswordSet = !!hash
  }

  static defaults(){
    return new Password(null, null)
  }

  static fromHash(hash: string){
    return new Password(null, hash)
  }

  static generateHash(text: string){
    // User reistration happens in the company once in while
    // so sync functions will be fine. Won't affect overral system latency
    // Read https://www.npmjs.com/package/bcrypt -> why async mode is recommended
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(text, salt)
    return new Password(text, hash)
  }

  static getHiddenFormat(plainPassword: string){
    const length = plainPassword.length
    const blackedLength =  length-4
    const blackedString = plainPassword.substr(0, blackedLength)

    let blankString  = '';
    for (let i = 0; i<blackedLength; i++){
      blankString += 'x'
    }

    return plainPassword.replace(blackedString, blankString)


  }

  matches(plainTextPassword: string): boolean{
    if(!this.value){
      throw new BadRequestException('Cannot authenticate an unactivated account')
    }
    return bcrypt.compareSync(plainTextPassword,this.value )
  }


}
