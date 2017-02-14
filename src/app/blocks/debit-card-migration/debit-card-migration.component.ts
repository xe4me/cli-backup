import {
    Component,
    OnDestroy,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewContainerRef
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';
import {
    Constants,
    SharedFormDataService
} from '../../shared';

@Component({
    selector: 'app-debit-card-migration-block',
    templateUrl: 'debit-card-migration.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebitCardMigrationBlock extends FormBlock implements AfterViewInit, OnDestroy {

    constructor( _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 private viewContainerRef : ViewContainerRef,
                 private sharedFormDataService : SharedFormDataService,
                 saveService : SaveService) {
        super(saveService, _cd, scrollService);
    }

    public ngAfterViewInit () : void {
    }

    public ngOnDestroy () : void {
    }
}
