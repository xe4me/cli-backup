import { Injectable } from '@angular/core';

@Injectable()
export class SaveAndCloseService {
    public mobileNumber : string;
    public exitUrl : string;
    public smsMessage : string;
    constructor () {

    }
}
