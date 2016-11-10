import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    NgZone
} from '@angular/core';
import { AmpReCaptchaService } from '../services/amp-recaptcha.service';

@Component({
   selector: 'amp-google-recaptcha',
   template: `<div #recaptchaId></div>`

})
export class AmpReCaptchaComponent implements OnInit {
    // Get the site id key at https://www.google.com/recaptcha/admin
    // for ddc dev sitekey: 6LeqZgsUAAAAAD9-le6RQUkUv5MTjhsSM-SldWKq
    // for localhost sitekey: 6LcWZwsUAAAAABf92GVXFx5XqcINVs8vBfK_fx1W
    @Input()
    sitekey : string = null;
    @Input()
    theme : string = 'light'; // light|dark
    @Input()
    type : string = 'image'; // image|audio
    @Input()
    size = 'normal'; // compact|normal
    @Input()
    tabindex : number = 0;
    @Input()
    language : string = null; // see available language at https://developers.google.com/recaptcha/docs/language

    @Output()
    captchaResponse = new EventEmitter<any>();
    @Output()
    captchaExpired = new EventEmitter();

    @ViewChild('recaptchaId') recaptchaRef : ElementRef;
    widgetId : any = null;

    constructor(
        private zone : NgZone,
        private captchaService : AmpReCaptchaService) {
    }

    ngOnInit() {
        this.captchaService.loadScript(this.language)
            .subscribe((loaded) => {
                if (loaded) {
                    let captchaOptions = this.buildCaptchaOptions();
                    // console.log('captchaOptions', captchaOptions);
                    this.widgetId = (<any> window).grecaptcha.render(this.recaptchaRef.nativeElement, captchaOptions);
                }
            });
    }

    public reset() {
        if (!!this.widgetId) {
            (<any> window).grecaptcha.reset(this.widgetId);
        }
    }

    public getResponse() : string {
        if (!!this.widgetId) {
            return (<any> window).grecaptcha.getResponse(this.recaptchaRef.nativeElement);
        }
    }

    private buildCaptchaOptions() {
        let captchaOptions : any = {};

        captchaOptions['sitekey'] = this.sitekey;
        captchaOptions['theme'] = this.theme;
        captchaOptions['type'] = this.type;
        captchaOptions['size'] = this.size;
        captchaOptions['tabindex'] = this.tabindex;
        captchaOptions['callback'] = <any> ((response : any) => this.zone.run(this.recaptchaCallback.bind(this, response)));
        captchaOptions['expired-callback'] = <any> (() => this.zone.run(this.recaptchaExpiredCallback.bind(this)));

        return captchaOptions;
    }

    private recaptchaCallback(response : string) {
        this.captchaResponse.emit({
            success : response != null && response.length ? true : false,
            token : response,
            recaptcha : this
        });
    }

    private recaptchaExpiredCallback() {
        this.captchaExpired.emit();
    }
}
