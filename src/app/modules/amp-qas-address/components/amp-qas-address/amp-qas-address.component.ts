import {
    Component , Input , ViewChild , Output , EventEmitter , OnInit ,
    ChangeDetectionStrategy
} from '@angular/core';
import { AmpQasAddressService } from '../../services/amp-qas-address.service';
import { AmpTypeaheadComponent } from '../../../amp-typeahead';
import { FormGroup } from '@angular/forms';
@Component( {
    selector        : 'amp-qas-address' ,
    template        : require( './amp-qas-address.component.html' ) ,
    styles          : [ require( './amp-qas-address.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpQasAddressComponent implements OnInit {
    public static QAS_ADDRESS_CONTROL_GROUP_NAME = 'qasAddress';
    @Input() id                                  = 'default-qas-id';
    @Input() label                               = 'Default qas label';
    @Input() controlGroup;
    @Input() errors                              = {
        required : 'Address is a required field.'
    };
    @Input() placeholder                         = 'Default place holder';
    @Input() required;
    @Input() isInSummaryState;
    @Input() minTriggerLength                    = 3;
    @Output( 'selected' ) $selected              = new EventEmitter<any>();
    public qasControlGroup                       = new FormGroup( {} );
    private _selectedControl;

    constructor ( private _ampQasAddressService : AmpQasAddressService ) {
    }

    ngOnInit () : void {
        if ( this.controlGroup ) {
            this.controlGroup.addControl( AmpQasAddressComponent.QAS_ADDRESS_CONTROL_GROUP_NAME , this.qasControlGroup );
        }
    }

    public showManualAddrForm () {
        alert( 'Show manual' );
    }

    get selectedControl () {
        if ( ! this._selectedControl && this.qasControlGroup.contains( this.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ) ) {
            this._selectedControl = this.qasControlGroup.controls[ this.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ];
        }
        return this._selectedControl;
    };

    public onOptionSelect ( $event ) {
        this.$selected.emit( $event );
    }

    private customValidator = () : Function => {
        return ( c ) => {
            if ( c.value && c.value.length >= this.minTriggerLength && ! this.selectedControl.value ) {
                return c.searchResult === null ? {
                    addressNotFound : {
                        text : c._ampErrors && c._ampErrors.addressNotFound ? c._ampErrors.addressNotFound : ''
                        // there is not text in this error because the text is html is provided as a template up in the amp-error
                        // but it can have text as well
                    }
                } : {
                    invalidAddress : {
                        text : c._ampErrors && c._ampErrors.invalidAddress ? c._ampErrors.invalidAddress : 'This address is not valid.'
                    }
                };
            } else {
                return null;
            }
        };
    };
}
