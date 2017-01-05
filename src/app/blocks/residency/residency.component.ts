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
    selector        : 'residency-block',
    templateUrl     : './residency.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class ResidencyBlock extends FormBlock {
    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }
}
