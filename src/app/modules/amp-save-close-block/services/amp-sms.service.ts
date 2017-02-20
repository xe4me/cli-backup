import { Injectable } from '@angular/core';
import {
    SaveAndCloseService,
    AmpHttpService
} from '../../../services';
import { Environments } from '../../../abstracts/environments/environments.abstract';
@Injectable()
export class AmpSmsService {
    public static BASE_URL = Environments.property.ApiCallsBaseUrl;
    public static SMS_URL = `${AmpSmsService.BASE_URL}/sms/postMessage`;
    constructor(
        private http : AmpHttpService,
        private saveCloseService : SaveAndCloseService) {

    }
    public sendSMS (mobileNumber : string) {
        const queryUrl : string = encodeURI(AmpSmsService.SMS_URL);
        const data = {
            mobile : mobileNumber,
            smsMessage: this.saveCloseService.smsMessage
        };
        return this
            .http
            .post(queryUrl, data, {});

    }
}
