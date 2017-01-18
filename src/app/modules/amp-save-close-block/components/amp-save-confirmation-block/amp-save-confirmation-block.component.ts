import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    ActivatedRoute,
    Params
} from '@angular/router';
import {
    SaveService
} from '../../../../services';

@Component( {
    selector    : 'amp-save-confirmation-block',
    template : require( './amp-save-confirmation-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush,
} )
export class AmpSaveConfirmationBlockComponent {
    public referenceNumber : string;
    private __custom;
    constructor( private saveService : SaveService) {
        this.referenceNumber = this.saveService.referenceId;
    }
}
