import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SaveAndCloseService {
    public mobileNumber : string;
    public exitUrl : string;
    public smsMessage : string;
    public showSaveAndClose : Observable<boolean> = false;
    constructor () {

    }

    public enable() : void {
        this.showSaveAndClose = true;
    }
}
