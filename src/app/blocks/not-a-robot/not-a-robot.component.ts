import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    OnInit ,
    ChangeDetectionStrategy ,
    Input ,
    AfterViewInit ,
    ViewChild
} from '@angular/core';
import * as moment from 'moment';
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
    styles :  [ require('./not-a-robot.component.scss')]
} )
export class BasicInfoBlock extends FormBlock implements OnInit {

    private sitekey : string = Environments.property.GoogleRecaptcha.sitekey;
    private showCaptchaBlock : boolean = true;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        // console.log('applicantIndex', this.__custom.applicantIndex);
        this.showCaptchaBlock = this.__custom.applicantIndex === 1 ? true : false;
    }

    private handleCaptchaResponse(captchaResponse : any) {
        // console.log('Resolved captcha with response', captchaResponse);
    }

}
