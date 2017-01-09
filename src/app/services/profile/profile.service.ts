import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { ErrorService } from '../error/error.service';
export interface Profile {
    partyKey : number;
    parentPosition : number;
    interestAreas : string[];
    commPrefFlag : boolean;
    isBankIdCheckCompleted : boolean;
    partyType : string;
    ownernum : string;
    payeeId : string;
    partyIdTypeCode : string;
    partyStatusCode : string;
    specifiedOfficer : string;
    lastName : string;
    nickName : string;
    address : string;
    suburb : string;
    state : string;
    postCode : string;
    country : string;
    workPhoneNumber : string;
    workFaxNumber : string;
    emailAddress : string;
    segment : string;
    companyName : string;
    agreementTypeCode : string;
    conversionIndicator : string;
    dataSyncUpdate : string;
    visibilityTypeCode : string;
}
@Injectable()
export class ProfileService {

    private baseUrl         = Environments.property.TamServicePath + Environments.property.GwPracticeService.EnvPath + Environments.property.GwPracticeService.Path;
    private profileEndpoint = '/profile';
    private profileUrl      = this.baseUrl + this.profileEndpoint;
    private headers         = new Headers( { 'Content-Type' : 'application/json' } );
    private httpOptions     = new RequestOptions( { headers : this.headers } );
    private profileReplaySubject : any;

    constructor ( private http : AmpHttpService ) {
    }

    public getProfile ( overrideUrl? : string ) : Observable<Profile> {
        return this.profileReplaySubject ? this.profileReplaySubject : this.createProfileReplaySubject( overrideUrl );
    }

    public createProfileReplaySubject ( overrideUrl? : string ) : Observable<Profile> {
        this.profileReplaySubject = this
            .http
            .get( overrideUrl || this.profileUrl, this.httpOptions )
            .map( ( res ) => res.json().data )
            .catch( ErrorService.handleError )
            .publishReplay();
        this.profileReplaySubject.connect();
        return this.profileReplaySubject;
    }
}
