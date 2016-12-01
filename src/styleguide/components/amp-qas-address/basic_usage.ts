import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Highlight } from '../../highlight';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { BasicUtils } from '../../../app/modules/amp-utils/basic-utils';
import { AmpQasAddressComponent } from '../../../app/modules/amp-qas-address/components/amp-qas-address/amp-qas-address.component';
@Component( {
    templateUrl : 'src/styleguide/components/amp-qas-address/basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ],
    directives : [
        Highlight,
        AmpButton
    ],
    selector : 'amp-qas-address-basic-usage'
} )

export default class AmpQasAddressComponentBasicUsage  {
    @ViewChild( 'qas' ) qasComponent : AmpQasAddressComponent;
    public __controlGroup = new FormGroup( {} );
    public isInSummaryState = false;
    public __custom = {
        controls : [
            {
                id : 'amp-qas',
                label : 'Search here',
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor( private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
    }
    get summaryAddress() {
        if ( this.qasComponent.qasControlGroup && this.qasComponent.qasControlGroup.value.manualAddress ) {
            return BasicUtils.formatAddress( this.qasComponent.qasControlGroup.value.manualAddress );
        } else {
            return '';
        }
    }
}
