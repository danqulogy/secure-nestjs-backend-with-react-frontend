import { InvalidArgumentException, InvalidEmailFormatException } from '../../../common';
import {ValueObject} from "../../../common";

export class Email extends ValueObject<string>{

    readonly value: string

    constructor(input) {
        super()
        if (!Email.isValidEmail(input)){
            throw new InvalidEmailFormatException('Invalid email address format')
        }
        if (input===null || input === undefined) {
            throw new InvalidArgumentException('Email address is required')
        }

        this.value = input
    }

    private static isValidEmail(aUsername: string){
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEX.test(String(aUsername))
    }

}
