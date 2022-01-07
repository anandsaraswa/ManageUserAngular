export class Address {
    public id: number;
    public userId: number;
    public address1: string;
    public pincode: number;
    public addressType: string;
    public city: string;
    public created_on: Date;
    constructor(
                address1: string, 
                pincode: number, 
                addressType: string,
                city: string
                ) {
                    this.address1 = address1;
                    this.pincode = pincode
                    this.addressType = addressType
                    this.city = city
                   
    }

 
}