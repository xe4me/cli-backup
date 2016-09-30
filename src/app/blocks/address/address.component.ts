import {
    Component , ChangeDetectorRef , ElementRef , OnInit , ChangeDetectionStrategy , Input ,
    AfterViewInit
} from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService ,
    FormService
} from 'amp-ddc-components';
@Component( {
    selector        : 'address-block' ,
    templateUrl     : './address.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AddressBlock extends FormBlock {
    public postalAddressDifferent : boolean;
    constructor ( formModelService : FormModelService ,
                  elementRef : ElementRef ,
                  private formService : FormService ,
                  _cd : ChangeDetectorRef ,
                  scrollService : ScrollService ,
                  progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngAfterViewInit() {
        const postalAddressCheckbox = this.__controlGroup.get(this.__custom.controls[1].id);
        postalAddressCheckbox.valueChanges.subscribe(val => {
            this.postalAddressDifferent = val;
        });
        super.ngAfterViewInit();
    }
}
