import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';
@Component( {
    selector        : 'tax-file-number-block',
    templateUrl     : './tax-file-number.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class TaxFileNumberBlock extends FormBlock implements AfterViewInit {
    public hasTfn : AbstractControl;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        this.hasTfn = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        super.ngAfterViewInit();
    }
}
