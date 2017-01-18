import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Optional
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { ScrollService, SaveService } from '../../../../services';
import {SaveAndCloseService} from "../../../../services/save-and-close/save-and-close.service";

@Component({
    selector        : 'amp-basic-info-block',
    template        : require('./amp-basic-info-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require('./amp-basic-info-block.component.scss') ]
})
export class AmpBasicInfoBlockComponent extends FormBlock {

    constructor( saveService : SaveService ,
                 _cd : ChangeDetectorRef ,
                 @Optional() private saveCloseService : SaveAndCloseService ,
                 scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }
    onNext() {
        this.saveCloseService.enable();
    }
}
