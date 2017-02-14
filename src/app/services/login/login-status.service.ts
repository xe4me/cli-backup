import { Injectable } from '@angular/core';
import {
    RequestOptions,
    Headers,
    Response
} from '@angular/http';
import {
    ReplaySubject,
    Observable
} from 'rxjs';
import { AmpHttpService } from '../amp-http/amp-http.service';
import { Environments } from '../../abstracts/environments/environments.abstract';

@Injectable()
export class LoginStatusService {

    private apiUserSessionUrl =
                Environments.property.TamServicePath +
                Environments.property.GwDDCService.EnvPath +
                Environments.property.GwDDCService.Path +
                '/usersession';

    private eventSubject : ReplaySubject<boolean>;
    private loggedIn : boolean;

    public constructor (private http : AmpHttpService) {
        this.eventSubject = new ReplaySubject<boolean>(1);
        this.loggedIn = false;
        this.checkLoginStatus();
    }

    // Call the MyAMP Junction in TAM
    public checkLoginStatus () {
        let headers = new Headers( {
            'Content-Type' : 'application/json',
            'caller'       : Environments.property.ExperienceName || 'components'
        } );
        let options = new RequestOptions( { headers, body : '' } );
        this.http.get( this.apiUserSessionUrl, options )
                   .subscribe((res : Response) => {
                        if (res.ok) {
                            this.loginSuccess();
                        } else {
                            this.notLoggedIn();
                        }
                   }, (err) => {
                       console.error('Failed to check session validity.', err);
                   });
    }

    // Triggered by the login block
    public loginSuccess () {
        // Do not broadcast if the status has not changed.
        // So that we can checkLoginStatus as many times as we like.
        if (!this.loggedIn) {
            this.loggedIn = true;
            this.eventSubject.next( this.loggedIn );
        }
    }

    // Use by captcha and Prepop
    public userHasLoggedIn () : Observable<any> {
        return this.eventSubject;
    }

    public hasLoggedIn () : boolean {
        return this.loggedIn;
    }

    private notLoggedIn () {
        this.loggedIn = false;
        // In future, maybe we need to know when we get log out...
    }
}
