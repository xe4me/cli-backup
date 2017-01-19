import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit
} from '@angular/core';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';

@Component( {
    selector        : 'amp-tax-file-number-block',
    template        : require( './amp-tax-file-number-block.component.html' ),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpTaxFileNumberBlockComponent extends FormBlock implements AfterViewInit {

    public hasTfn : boolean = null;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService ) {
        super( saveService, _cd, scrollService );
    }

    onTaxGroupButtonClick ( $event ) {
        this.hasTfn = $event;
        this._cd.detectChanges();
    }
}
