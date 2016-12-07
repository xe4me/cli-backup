import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    AfterViewInit
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    AutoFocusOnDirective ,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector        : 'not-a-robot-block' ,
    templateUrl     : './not-a-robot.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles :  [ require('./not-a-robot.component.scss') ]
} )
export class NotARobotBlock extends FormBlock implements AfterViewInit {
    private sitekey : string = Environments.property.GoogleRecaptcha.sitekey;
    private showCaptchaBlock : boolean = true;
    private verified : boolean = false;
    private keepControl : boolean = true;

    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.__isRetrieved && this.__controlGroup.valid) {
            this.hideBlock();
        }
    }

    private handleCaptchaResponse(response) {
        this.verified = response.success;
    }

    private handleCaptchaExpired(event) {
        // BET-3872: Remove captcha block after successfully verified
        if (this.verified) {
            this.hideBlock();
        }
        this._cd.markForCheck();
    }

    private hideBlock () {
        this.showCaptchaBlock = false;
    }
}
