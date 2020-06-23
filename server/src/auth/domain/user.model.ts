import {IUser} from "../db/user.document";
import {ModelId} from "./valueObjects/ModelId";
import {Email} from "./valueObjects/Email";
import {Password} from "./valueObjects/password.value";
import {PersonName} from "./valueObjects/PersonName";

export class User {
    readonly id: ModelId
    readonly email: Email

    private _name: PersonName
    get name() { return this._name}

    private _password: Password
    get password() { return this._password}

    constructor(data: IUser, ) {

        this._name = PersonName.create(data.name)
        this.email = new Email(data.email)
        this._password = Password.generateHash(data.password)

        // applies when it is an existing database entity with ID
        if(data._id){
            this.id = ModelId.create(data._id)
            this._password = Password.fromHash(data.password)
        }
    }

    changePassword(newPasswordPlainText: string): void{
        this._password = Password.generateHash(newPasswordPlainText)
    }

}