

export class AllUsers {
    public allUsers: any[];
    public total: string;

    constructor(data: any[], total: string) {
        this.allUsers =  data
        this.total = total
    }

}