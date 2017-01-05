import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';
@Component( {
    selector        : 'source-of-funding-block',
    templateUrl     : './source-of-funding.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SourceOfFundingBlock extends FormBlock {
    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }
}
