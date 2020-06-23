import { isNotEmpty } from 'class-validator';
import {ValueObject} from "../../../common";

export class PersonName extends ValueObject<string>{

    readonly value: string

    private constructor(value: string) {
        super();
        this.value = value
    }

    static create(val: string, isMiddleName= false){
       if(!isMiddleName){
           isNotEmpty(val)
           return new PersonName(val)
       }
       return new PersonName(val)
    }
}
