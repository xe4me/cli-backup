import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SaveAndCloseService {
    public mobileNumber : string;
    public exitUrl : string;
    public smsMessage : string;
    public showSaveAndClose : Subject<boolean> = new Subject();
    constructor () {
        this.showSaveAndClose.next(false);
    }

    public enable() : void {
        this.showSaveAndClose.next(true);
    }
}
