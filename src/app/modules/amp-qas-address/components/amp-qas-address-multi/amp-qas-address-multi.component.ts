import {
    Component , AfterViewInit , Input , ChangeDetectionStrategy , ChangeDetectorRef ,
    OnInit
} from '@angular/core';
import { AmpQasAddressService , AddressFormatTypes } from '../../services/amp-qas-address.service';
import { FormGroup } from '@angular/forms';
import { isTrue } from '../../../amp-utils/functions.utils';
@Component( {
    selector        : 'amp-qas-address-multi' ,
    template        : require( './amp-qas-address-multi.component.html' ) ,
    styles          : [ require( './amp-qas-address-multi.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpQasAddressMultiComponent implements OnInit {
    @Input() id : string                   = 'default-qas-multi-id';
    @Input() controlGroup : FormGroup;
    @Input() required : boolean;
    @Input() index;
    @Input() isInSummaryState : boolean;
    @Input() postalAddress                 = {
        id    : 'postalAddress' ,
        label : 'Postal address'
    };
    @Input() residentialAddress            = {
        id    : 'residentialAddress' ,
        label : 'Residential address'
    };
    @Input() postalAndResidentialAreSame   = {
        id : 'postalAndResidentialAreSame'
    };
    private arePostalAndResidentialTheSame = true;
    private qasMultiCG                     = new FormGroup( {} );

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () : void {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( this.id , this.qasMultiCG );
        }
    }

    private onCheckboxSelect ( _value ) {
        this.arePostalAndResidentialTheSame = _value;
        this._cd.detectChanges();
    }

    get isPostalAndResidentialAreSameRequired () {
        return this.required && this.arePostalAndResidentialTheSame;
    }
}
