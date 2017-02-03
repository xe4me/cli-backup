import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class MockLoginStatusService {

    private eventSource : Observable<any>;
    private eventSubject : Subject<any>;

    public constructor () {
        this.eventSubject = new Subject();
        this.eventSource = this.eventSubject.publishReplay().refCount();
    }

    public loginSuccess () {
        this.eventSubject.next( true );
    }

    public userHasLoggedIn () : Observable<any> {
        return this.eventSource;
    }
}
