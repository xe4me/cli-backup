import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { AmpButton , ProgressObserverService , FormBlock , FormModelService , ScrollService }
        from 'amp-ddc-components';
@Component( {
    selector        : 'welcome-block' ,
    templateUrl     : './welcome-block.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class WelcomeBlockComponent extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
