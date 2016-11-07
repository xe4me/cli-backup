import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService
} from 'amp-ddc-components';
@Component( {
    selector        : 'account-confirmation' ,
    templateUrl     : './account-confirmation.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    styles          : [ require( './account-confirmation.component.scss' ).toString() ]
} )
export class AccountConfirmationBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
