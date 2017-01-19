import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';

@Component( {
    selector        : 'amp-residency-block',
    template        : require('./amp-residency-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpResidencyBlockComponent extends FormBlock {

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }
}
