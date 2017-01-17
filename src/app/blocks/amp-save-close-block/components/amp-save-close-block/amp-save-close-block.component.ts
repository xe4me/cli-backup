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
    selector    : 'amp-save-close-block',
    template : require( './amp-save-close-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush,
} )
export class AmpSaveCloseBlockComponent {
    public referenceNumber : string;
    private __custom;
    constructor( private saveService : SaveService) {
        this.referenceNumber = this.saveService.referenceId;
    }
}
