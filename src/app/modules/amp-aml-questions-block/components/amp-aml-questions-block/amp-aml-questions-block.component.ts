import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';

@Component( {
    selector        : 'amp-aml-questions-block',
    template        : require('./amp-aml-questions-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpAmlQuestionsBlockComponent extends FormBlock {

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

}
