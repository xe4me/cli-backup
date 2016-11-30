import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
@Component( {
    selector        : 'continue-application-block' ,
    templateUrl     : './continue-application.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    styles          : [ require( './continue-application.component.scss' ).toString() ]
} )
export class ContinueApplicationBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public onNext() {
        //TODO retrieve application
        super.onNext();
    }
}
