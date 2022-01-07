
import { EventEmitter, Injectable } from "@angular/core";
import { Subscriber } from "rxjs";
import { Address } from "../models/address.model";

import { Users } from "../models/users.model";
@Injectable({ providedIn: "root" })
export class CommunicationService {
    loggedInStatus =  new EventEmitter<boolean>();
    user =  new EventEmitter<Users>();
    address =  new EventEmitter<any>();
    addressEdit =  new EventEmitter<any>();
    error =  new EventEmitter<string>();
    constructor() { }
}