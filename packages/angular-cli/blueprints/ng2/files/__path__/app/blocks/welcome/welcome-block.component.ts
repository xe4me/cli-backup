import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    OnInit ,
    ViewContainerRef ,
    ViewChild
} from '@angular/core';
import { FormControl , Validators , AbstractControl } from '@angular/forms';
import {
    ProgressObserverService ,
    FormBlock ,
    FormModelService ,
    ScrollService
} from 'amp-ddc-components';
@Component( {
    selector        : 'welcome-block' ,
    templateUrl     : './welcome-block.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    styles          : [ require( './welcome-block.component.scss' ) ]
} )
export class WelcomeBlockComponent extends FormBlock  {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
