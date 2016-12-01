import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    NgZone
} from '@angular/core';
import { AmpReCaptchaService } from '../services/amp-recaptcha.service';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
@Component({
   selector: 'amp-google-recaptcha',
   changeDetection: ChangeDetectionStrategy.OnPush,
   template: `<div #recaptchaId></div>`

})
export class AmpReCaptchaComponent implements OnInit {
    // Get the site id key at https://www.google.com/recaptcha/admin
    // for ddc dev sitekey: 6LeqZgsUAAAAAD9-le6RQUkUv5MTjhsSM-SldWKq
    // for localhost sitekey: 6LcWZwsUAAAAABf92GVXFx5XqcINVs8vBfK_fx1W
    @Input()
    id : string = 'amp-google-recaptcha-check';
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

    @Input()
    controlGroup : FormGroup;
    @Input()
    keepControl : boolean = false;

    @Output()
    captchaResponse = new EventEmitter<any>();
    @Output()
    captchaExpired = new EventEmitter();

    @ViewChild('recaptchaId') recaptchaRef : ElementRef;
    widgetId : any = null;

    private recaptchaControlGroup : FormGroup;
    private myScriptLoaded : Subscription;

    constructor(
        private zone : NgZone,
        private _cd : ChangeDetectorRef,
        private captchaService : AmpReCaptchaService) {
    }

    public ngOnInit() : any {
        // this.createControls();
        this.myScriptLoaded = this.captchaService.loadScript(this.language)
            .subscribe((loaded) => {
                if (loaded) {
                    let captchaOptions = this.buildCaptchaOptions();
                    // console.log('captchaOptions', captchaOptions);
                    this.widgetId = (<any> window).grecaptcha.render(this.recaptchaRef.nativeElement, captchaOptions);
                    this.createControls();
                }
            });
    }

    public ngOnDestroy() {
        if (!this.keepControl && this.controlGroup && this.id) {
            this.controlGroup.removeControl(this.id);
        }
        this.myScriptLoaded.unsubscribe();
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

    private createRecaptchaControlGroup() {
        return new FormGroup({
            verificationStatus: new FormControl(null, Validators.required),
            verificationToken: new FormControl(null, Validators.required)
        });
    }

    private createControls() {
        if (this.controlGroup) {
            if (this.controlGroup.contains(this.id)) {
                this.recaptchaControlGroup = <FormGroup> this.controlGroup.get(this.id);
            } else {
                this.recaptchaControlGroup = this.createRecaptchaControlGroup();
                this.controlGroup.addControl(this.id, this.recaptchaControlGroup);
            }
        } else {
            this.recaptchaControlGroup = this.createRecaptchaControlGroup();
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
        let success = response != null && response.length ? true : false;
        this.recaptchaControlGroup.controls['verificationStatus'].setValue(success ? 'verified' : '');
        this.recaptchaControlGroup.controls['verificationToken'].setValue(response);
        this.captchaResponse.emit({
            success : success,
            token : response,
            recaptcha : this
        });
        // Mark control group as touched only when user has completed the captcha challenge.
        // Pagesection container will have class 'visited' when a control group in it is marked as touched. Standalone navigation menu will become highlighted. 
        this.recaptchaControlGroup.markAsTouched();
        this._cd.markForCheck();
    }

    private recaptchaExpiredCallback() {
        if (this.controlGroup && this.id) {
            if (!this.keepControl || this.recaptchaControlGroup.controls['verificationStatus'].value !== 'verified') {
                this.recaptchaControlGroup.controls['verificationStatus'].setValue(null);
            }
        }
        else {
            this.recaptchaControlGroup.controls['verificationStatus'].setValue(null);
        }
        this.captchaExpired.emit();
    }
}
