export class User {
    public _id?: string;
    public username: string;
    public password: string;

    constructor(_id: string, username: string,password: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
    }
}