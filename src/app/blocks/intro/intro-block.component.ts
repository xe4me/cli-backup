import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpButton , ProgressObserverService , FormBlock , FormModelService , ScrollService } from "amp-ddc-components";
@Component( {
    selector        : 'intro-block' ,
    templateUrl     : './intro-block.html',
    styles          : [ require( './intro-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class IntroBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    context () {
        return this;
    }
}
