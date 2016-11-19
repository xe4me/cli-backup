import {
    Injectable,
    NgZone
} from '@angular/core';
import {
    Observable,
    BehaviorSubject
} from 'rxjs/Rx';

/*
* This component responsible for loading Google ReCaptcha API once
*/
@Injectable()
export class AmpReCaptchaService {

    private scriptLoaded : boolean = false;
    // see http://reactivex.io/documentation/subject.html
    private readySubject : BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(zone : NgZone) {
        // the onloadCallback needs to exist before API is loaded
        window[<any> 'reCaptchaOnloadCallback'] = <any> ( () => zone.run(this.onloadCallback.bind(this)) );
    }

    public loadScript(language : string) {
        if (!this.scriptLoaded) {
            this.scriptLoaded = true;
            let body = <HTMLDivElement> document.body;
            let script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://www.google.com/recaptcha/api.js?onload=reCaptchaOnloadCallback&render=explicit' +
                (language ? '&hl=' + language : '');
            script.async = true;
            script.defer = true;
            body.appendChild(script);
        }
        return this.readySubject.asObservable();
    }

    private onloadCallback() {
        this.readySubject.next(true);
    }
}
