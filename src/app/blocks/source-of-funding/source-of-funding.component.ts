import { Component , ChangeDetectorRef , ElementRef , ChangeDetectionStrategy } from '@angular/core';
import { FormBlock , ScrollService , FormModelService , ProgressObserverService } from 'amp-ddc-components';
@Component( {
    selector        : 'source-of-funding-block' ,
    templateUrl     : './source-of-funding.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SourceOfFundingBlock extends FormBlock {
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}
