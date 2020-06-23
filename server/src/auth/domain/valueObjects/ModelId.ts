import { isMongoId } from 'class-validator';
import {ValueObject} from "../../../common";

export class ModelId extends ValueObject<string>{

  readonly value: string

  private constructor(value: string) {
    super();
    this.value = value
  }

  static create(val: string){
    isMongoId(val)
    return new ModelId(val)
  }


}


