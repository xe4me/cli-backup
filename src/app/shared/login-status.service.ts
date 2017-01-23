import {
    Injectable
} from '@angular/core';
import {
    Subject,
    Observable
} from 'rxjs';

@Injectable()
export class LoginStatusService {
    private eventSource : Observable<any>;
    private eventSubject : Subject<any>;

    public constructor () {
        this.eventSubject = new Subject();
        this.eventSource = this.eventSubject.publishReplay().refCount();
    }

    public loginSuccess () {
        this.eventSubject.next(true);
    }

    public userHasLoggedIn () : Observable<any> {
        return this.eventSource;
    }
}
