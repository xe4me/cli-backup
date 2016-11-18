import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
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
export class NotARobotBlock extends FormBlock {

    private sitekey : string = Environments.property.GoogleRecaptcha.sitekey;
    private showCaptchaBlock : boolean = true;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
