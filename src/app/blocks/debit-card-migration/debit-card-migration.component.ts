import {
    Component,
    OnDestroy,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';

@Component({
    selector        : 'debit-card-block',
    template        : require( './debit-card-migration.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class DebitCardMigrationBlock extends FormBlock {

    constructor( _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 saveService : SaveService) {
        super(saveService, _cd, scrollService);
    }
}
