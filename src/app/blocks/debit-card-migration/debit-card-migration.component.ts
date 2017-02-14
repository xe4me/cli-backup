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
    selector: 'app-debit-card-migration-block',
    templateUrl: 'debit-card-migration.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebitCardMigrationBlock extends FormBlock implements AfterViewInit, OnDestroy {

    constructor( _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 saveService : SaveService) {
        super(saveService, _cd, scrollService);
    }

    public ngAfterViewInit () : void {
        super.ngAfterViewInit();
    }

    public ngOnDestroy () : void {
    }
}
