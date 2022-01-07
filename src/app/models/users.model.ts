export class Users {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public password: string;
    public email: string;
    public phoneNumber: string;
    public role: string;
    public image: string;
    public created_on: Date;

    constructor(id:  number, 
                firstName: string, 
                lastName: string, 
                email: string, 
                phoneNumber: string,
                role: string,
                created_on: Date
                ) {
                    this.id = id;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email
                    this.phoneNumber = phoneNumber
                    this.role = role
                    this.created_on = created_on
                 
    }
}