import { Injectable } from '@angular/core';
import {
    Subject,
    Observable
} from 'rxjs';

@Injectable()
export class GreenIdStatusService {

    private eventSource : Observable<any>;
    private eventSubject : Subject<any>;
    private greenIdResults : boolean[] = [];

    public constructor () {
        this.eventSubject = new Subject();
        this.eventSource = this.eventSubject.publishReplay().refCount();
    }

    public greenIdVerified ( applicantIndex : number ) : void {
        this.greenIdResults[applicantIndex] = true;
        this.eventSubject.next( this.greenIdResults );
    }

    public isGreenIdVerified () : Observable<any> {
        return this.eventSource;
    }
}
