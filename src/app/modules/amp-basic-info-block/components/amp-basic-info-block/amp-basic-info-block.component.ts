import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';

@Component({
    selector        : 'amp-basic-info-block',
    template        : require('./amp-basic-info-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require('./amp-basic-info-block.component.scss') ]
})
export class AmpBasicInfoBlockComponent extends FormBlock {

    constructor( saveService : SaveService ,
                 _cd : ChangeDetectorRef ,
                 scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

}
