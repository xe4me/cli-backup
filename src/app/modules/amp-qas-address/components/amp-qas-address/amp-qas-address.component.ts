import {
    Component , Input , ViewChild , Output , EventEmitter , OnInit ,
    ChangeDetectionStrategy , AfterViewInit , ChangeDetectorRef
} from '@angular/core';
import { AmpQasAddressService } from '../../services/amp-qas-address.service';
import { AmpTypeaheadComponent } from '../../../amp-typeahead';
import { FormGroup } from '@angular/forms';
@Component( {
    selector : 'amp-qas-address' ,
    template : require( './amp-qas-address.component.html' ) ,
    styles   : [ require( './amp-qas-address.component.scss' ).toString() ]
} )
export class AmpQasAddressComponent implements AfterViewInit {
    @ViewChild( 'manualEntryCmp' ) manualEntryCmp;
    @Input() id                     = 'default-qas-id';
    @Input() label                  = 'Default qas label';
    @Input() controlGroup;
    @Input() errors                 = {
        required : 'Address is a required field.'
    };
    @Input() placeholder            = 'Default place holder';
    @Input() required;
    @Input() isInSummaryState;
    @Input() minTriggerLength       = 3;
    @Output( 'selected' ) $selected = new EventEmitter<any>();
    private _selectedControl;

    constructor ( private _cd : ChangeDetectorRef , private _ampQasAddressService : AmpQasAddressService ) {
    }

    ngAfterViewInit () : void {
        // This will make sure the view has got the latest changes from all the descendant
        this._cd.detectChanges();
    }

    public get qasControlGroup () {
        if ( this.controlGroup && this.controlGroup.contains( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ) ) {
            return this.controlGroup.controls[ AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ];
        }
    }

    public showManualAddrForm () {
        alert( 'Show manual' );
    }

    get selectedControl () {
        if ( ! this._selectedControl && this.qasControlGroup && this.qasControlGroup.contains( this.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ) ) {
            this._selectedControl = this.qasControlGroup.controls[ this.id + AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ];
        }
        return this._selectedControl;
    };

    public onOptionDeSelect ( $event ) {
        this.manualEntryCmp.updateControls( $event );
    }

    public onOptionSelect ( $event ) {
        let testManiker = 'COAUSHAfgBwMAAQAARkumQAAAAAAAFAA-';
        this._ampQasAddressService
            .getFormattedAddress( testManiker )
            .subscribe( ( _address )=> {
                console.log( 'address is :' , _address );
                this.manualEntryCmp.updateControls( _address );
                this.$selected.emit( _address );
            } );
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
