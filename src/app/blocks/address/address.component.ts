import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService
} from 'amp-ddc-components';
@Component( {
    selector        : 'address-block' ,
    templateUrl     : './address.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AddressBlock extends FormBlock {
    constructor ( _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  saveService : SaveService ) {
        super( saveService, _cd, scrollService );
    }
}
