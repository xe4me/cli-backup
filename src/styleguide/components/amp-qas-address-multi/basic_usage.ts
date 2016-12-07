import {
    Component,
    AfterViewInit
} from '@angular/core';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
import { Highlight } from '../../highlight';
import { FormModelService } from '../../../app/services/form-model/form-model.service';
@Component( {
    templateUrl : 'src/styleguide/components/amp-qas-address-multi/basic_usage.html',
    styles : [ require( './basic_usage.scss' ).toString() ],
    directives : [
        Highlight
    ],
    selector : 'amp-qas-address-multi-basic-usage'
} )

export default class AmpQasAddressMultiComponentBasicUsage implements AfterViewInit {
    public __controlGroup = new FormGroup( {} );
    public controlValue = {
        'amp-qas-retrieved' : {
            'residentialAddress' : {
                'isManualSearch' : false,
                'search' : {
                    'selectedItem' : 'AUS|78439e43-bec2-43fd-a96e-6e7b8fa527e1|0POAUSHAfgBwAAAAAIAwEAAAAAV2yGAAAAAAAAADgxAAD..2QAAAAA.....wAAAAAAAAAAAAAAAAA4MSBtZXJyaXZhbGUgcm9hZAA-',
                    'query' : '81 Merrivale Road, PYMBLE  NSW  2073'
                },
                'manualAddress' : {
                    'buildingName' : '',
                    'unitNumber' : '',
                    'streetNumber' : '81',
                    'streetName' : 'Merrivale',
                    'streetTypeDropdown' : { 'SelectedItem' : 'RD', 'Query' : 'Road' },
                    'poBox' : null,
                    'suburb' : 'PYMBLE',
                    'postCode' : '2073',
                    'stateDropdown' : { 'SelectedItem' : 'NSW', 'Query' : 'NSW' }
                },
                'isItPoBox' : false
            },
            'postalAndResidentialAreSame' : false,
            'postalAddress' : {
                'isManualSearch' : false,
                'search' : {
                    'selectedItem' : 'AUS|5ca17856-7b66-4f35-9ee9-22ba4c5e94a6|0OOAUSHAfgBwAAAAAIAwEAAAAABbrJQAAAAAAAADEwMAAA..9kAAAAAP....8AAAAAAAAAAAAAAAAAcG8gYm94IDEwMAA-',
                    'query' : 'PO Box 100, ABERDEEN  NSW  2336'
                },
                'manualAddress' : {
                    'buildingName' : '',
                    'unitNumber' : '',
                    'streetNumber' : '',
                    'streetName' : '',
                    'streetTypeDropdown' : { 'SelectedItem' : null, 'Query' : null },
                    'poBox' : 'PO Box 100',
                    'suburb' : 'ABERDEEN',
                    'postCode' : '2336',
                    'stateDropdown' : { 'SelectedItem' : 'NSW', 'Query' : 'NSW' }
                },
                'isItPoBox' : true
            }
        }
    };
    private retrievedControlGroup;
    private isInSummaryState = false;
    private __custom = {
        controls : [
            {
                id : 'amp-qas',
                label : 'Search here',
                required : true
            },
            {
                id : 'amp-qas-retrieved',
                label : 'Search here',
                required : true
            }
        ]
    };
    private form : FormGroup;

    constructor ( private formModelService : FormModelService, private _builder : FormBuilder ) {
        this.form = this._builder.group( {} );
        this.retrievedControlGroup = this.formModelService.hydrateForm( this.controlValue );
    }

    ngAfterViewInit () : void {
    }
}
