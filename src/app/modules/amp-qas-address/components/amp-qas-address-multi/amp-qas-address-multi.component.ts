import { Component , Input , ChangeDetectionStrategy , ChangeDetectorRef , OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmpFormGroup } from '../../../../base-control';
@Component( {
    selector        : 'amp-qas-address-multi' ,
    template        : require( './amp-qas-address-multi.component.html' ) ,
    styles          : [ require( './amp-qas-address-multi.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpQasAddressMultiComponent implements OnInit {
    @Input() id : string                   = 'qas-multi';
    @Input() controlGroup : AmpFormGroup;
    @Input() required : boolean;
    @Input() index;
    @Input() extended : boolean            = true;
    @Input() isInSummaryState : boolean    = false;
    @Input() keepControl : boolean         = false;
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
    private qasMultiCG;

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () : void {
        if ( this.controlGroup ) {
            if ( this.controlGroup.contains( this.id ) ) {
                this.qasMultiCG = this.controlGroup.get( this.id );
            } else {
                this.qasMultiCG = new FormGroup( {} );
                this.controlGroup.addControl( this.id , this.qasMultiCG );
            }
        } else {
            this.qasMultiCG = new FormGroup( {} );
        }
        this.qasMultiCG.__fdn = this.controlGroup && this.controlGroup.__fdn ? [ ...this.controlGroup.__fdn , this.id ] : [
            'default-fdn-for-' + this.id
        ];
    }

    private onCheckboxSelect ( $event ) {
        this.arePostalAndResidentialTheSame = $event.target.checked;
        if ( this.arePostalAndResidentialTheSame ) {
            if ( this.qasMultiCG.contains( this.postalAddress.id ) ) {
                this.qasMultiCG.removeControl( this.postalAddress.id );
            }
        }
        this._cd.detectChanges();
    }

    get isPostalAndResidentialAreSameRequired () {
        return this.required && this.arePostalAndResidentialTheSame;
    }
}
