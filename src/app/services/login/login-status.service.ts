import { Injectable } from '@angular/core';
import {
    Subject,
    Observable
} from 'rxjs';

@Injectable()
export class LoginStatusService {

    private eventSource : Observable<any>;
    private eventSubject : Subject<any>;
    private loggedIn : boolean;

    public constructor () {
        this.eventSubject = new Subject();
        this.eventSource = this.eventSubject.publishReplay().refCount();
        this.loggedIn = false;
    }

    public loginSuccess () {
        this.eventSubject.next( true );
        this.loggedIn = true;
    }

    public userHasLoggedIn () : Observable<any> {
        return this.eventSource;
    }

    public hasLoggedIn () : boolean {
        return this.loggedIn;
    }
}
