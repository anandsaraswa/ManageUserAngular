import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export class Crud{
    public id:number;
    public message:any;
    public status?:number;
    public timestamp?:any;
    public jwt:string;
    constructor(id:number,response:any, status:number,jwt:string, timestap:any){
       this.id =  id;
       this.message =  response;
       this.jwt =  jwt;
       this.status =  status;
       this.timestamp =  timestap;
    }
}    