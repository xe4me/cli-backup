import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    RequestOptions,
    Headers
} from '@angular/http';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';
import { ErrorService } from '../error/error.service';
export interface Advisor {
    ownernum : string;
    lastName : string;
    firstName? : string;
    middleName? : string;
    personalTitle? : string;
    parentPosition? : number;
    clientNumber : string;
    interestAreas : string[]; // @TODO I'm not sure if this is string
    commPrefFlag : boolean;
    isBankIdCheckCompleted : boolean;
    visibilityTypeCode : string;
    workPhoneNumber? : string;
    workFaxNumber? : string;
    emailAddress? : string;
    mobilePhoneNumber? : string;
}
@Injectable()
export class AdvisorsService {

    private baseUrl          = Environments.property.TamServicePath + Environments.property.GwDDCService.EnvPath + Environments.property.GwDDCService.Path;
    private advisorsEndpoint = '/advisors';
    private advisorsUrl      = this.baseUrl + this.advisorsEndpoint;
    private headers          = new Headers( { 'Content-Type' : 'application/json' } );
    private httpOptions      = new RequestOptions( { headers : this.headers } );
    private advisorsReplaySubject : any;

    constructor ( private http : AmpHttpService ) {
    }

    public getAdvisors ( overrideUrl? : string ) : Observable<Advisor[]> {
        return this.advisorsReplaySubject ? this.advisorsReplaySubject : this.createAdvisorsReplaySubject( overrideUrl );
    }

    public createAdvisorsReplaySubject ( overrideUrl? : string ) : Observable<Advisor[]> {
        this.advisorsReplaySubject =
            this.http
                .get( overrideUrl || this.advisorsUrl, this.httpOptions )
                .map( ( result ) => result.json().data )
                .catch( ErrorService.handleError )
                .map( this.filterWithPrsonalTitle )
                .publishReplay();
        this.advisorsReplaySubject.connect();
        return this.advisorsReplaySubject;
    }

    public filterWithPrsonalTitle ( list : Advisor[] ) : Advisor[] {
        return list.filter( ( adviser : Advisor ) => {
            return (adviser.personalTitle && adviser.personalTitle.length);
        } );
    }

}
