import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SaveAndCloseService {
    public mobileNumber : Subject<string> = new Subject( );
    public exitUrl : string;
    public smsMessage : string;
    public initialMobileNumber : string;
    public showSaveAndClose : Subject<boolean> = new Subject( );
    constructor () {
        this.showSaveAndClose.next(false);
    }

    public enable() : void {
        this.showSaveAndClose.next(true);
    }

    public updateMobileNumber( mobile : string ) : void {
        this.initialMobileNumber = mobile;
        this.mobileNumber.next(mobile);
    }
}
