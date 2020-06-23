import {HttpException, HttpStatus} from "@nestjs/common";

export class Exception extends Error{
    constructor(name: string, message: string) {
        super(message);
        this.name = name
    }
}

export class InvalidArgumentException extends HttpException{
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class IllegalStateException extends Exception{
    constructor(message: string) {
        super(IllegalStateException.name, message);
    }
}

export class InvalidEmailFormatException extends Exception{
    constructor(message: string) {
        super(InvalidEmailFormatException.name, message);
    }
}