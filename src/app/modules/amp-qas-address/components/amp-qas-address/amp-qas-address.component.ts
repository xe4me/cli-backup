import {
    Component,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    AfterViewInit,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';
import {
    AmpQasAddressService,
    AddressFormatTypes
} from '../../services/amp-qas-address.service';
import { AmpTypeaheadComponent } from '../../../amp-typeahead';
import { FormControl } from '@angular/forms';
import { AmpManualAddressComponent } from '../amp-manual-address/amp-manual-address.component';
import { addDashOrNothing } from '../../../amp-utils/functions.utils';
import { AmpFormGroup } from '../../../../base-control';
@Component( {
    selector : 'amp-qas-address',
    template : require( './amp-qas-address.component.html' ),
    styles : [ require( './amp-qas-address.component.scss' ).toString() ],
    providers : [ AmpQasAddressService ]
} )
export class AmpQasAddressComponent implements AfterViewInit, OnDestroy {
    @ViewChild( 'manualAddressCmp' ) manualAddressCmp : AmpManualAddressComponent;
    @ViewChild( 'typeaheadCmp' ) typeaheadCmp : AmpTypeaheadComponent;
    @Input() id : string = 'qas';
    @Input() addressType : string = '';
    @Input() label : string = 'Default qas label';
    @Input() controlGroup : AmpFormGroup;
    @Input() errors = {
        required : 'Address is a required field.'
    };
    @Input() placeholder : string = 'Default place holder';
    @Input() required : boolean;
    @Input() isInSummaryState : boolean;
    @Input() index;
    @Input() minTriggerLength : number = 3;
    @Input() keepControl : boolean = false;
    @Input() extended : boolean = false;
    @Output( 'selected' ) $selected : EventEmitter<any> = new EventEmitter<any>();
    public qasControlGroup : AmpFormGroup;
    private _selectedControl;
    private maxHeight : string = '250px';
    private searchOrManualControl : FormControl;
    private apiCallDebounceTime : number = 300;

    constructor ( private _cd : ChangeDetectorRef, private _ampQasAddressService : AmpQasAddressService ) {
    }

    ngOnInit () : void {
        if ( this.controlGroup ) {
            if ( this.controlGroup.contains( this.id + addDashOrNothing( this.index ) ) ) {
                this.qasControlGroup = <AmpFormGroup> this.controlGroup.get( this.id + addDashOrNothing( this.index ) );
                this.searchOrManualControl = <FormControl> this.qasControlGroup.get( 'isManualSearch' );
            } else {
                this.qasControlGroup = new AmpFormGroup( {} );
                this.searchOrManualControl = new FormControl();
                this.searchOrManualControl.setValue( false );
                this.qasControlGroup.addControl( 'isManualSearch', this.searchOrManualControl );
                this.controlGroup.addControl( this.id + addDashOrNothing( this.index ), this.qasControlGroup );
            }
        } else {
            this.qasControlGroup = new AmpFormGroup( {} );
        }
        this.qasControlGroup.__fdn = this.controlGroup && this.controlGroup.__fdn ? [ ...this.controlGroup.__fdn, this.id ] : [
            'default-fdn-for-' + this.id,
            this.label
        ];
    }

    ngOnDestroy () : void {
        if ( !this.keepControl ) {
            if ( this.controlGroup.contains( this.id + addDashOrNothing( this.index ) ) ) {
                this.controlGroup.removeControl( this.id + addDashOrNothing( this.index ) );
            }
        }
    }

    ngAfterViewInit () : void {
        if ( this.isResidentialAddress ) {
            this._ampQasAddressService.setUrlForResidential();
        }
        // This will make sure the view has got the latest changes from all the descendant
        this._cd.detectChanges();
        this.typeaheadCmp
            .$deSelected
            .debounceTime( 200 )
            .subscribe( ( change ) => {
                if ( this.qasControlGroup.touched ) {
                    this.onOptionDeSelect( change );
                }
            } );
    }

    public get typeaheadCG () : any {
        if ( this.qasControlGroup && this.qasControlGroup.contains( AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ) ) {
            return this.qasControlGroup.controls[ AmpTypeaheadComponent.SEARCH_ADDRESS_CONTROL_GROUP_NAME ];
        }
    }

    public showManualAddrForm () {
        setTimeout( () => {
            this.isInSummaryState = false;
            this.typeaheadCG.reset();
            this.manualAddressCmp.emptyControls();
            this.searchOrManualControl.setValue( true );
            this._cd.detectChanges();
        } );
    }

    public goBack () {
        setTimeout( () => {
            this.isInSummaryState = false;
            this.typeaheadCG.reset();
            this.manualAddressCmp.emptyControls();
            this.searchOrManualControl.setValue( false );
            this._cd.detectChanges();
        } );
    }

    get selectedControl () {
        if ( !this._selectedControl && this.typeaheadCG && this.typeaheadCG.contains( AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ) ) {
            this._selectedControl = this.typeaheadCG.controls[ AmpTypeaheadComponent.SELECTED_CONTROL_ID_POSTFIX ];
        }
        return this._selectedControl;
    };

    public onOptionDeSelect ( $event ) {
        this.manualAddressCmp.emptyControls();
    }

    public onOptionSelect ( $event ) {
        if ( !this.isInSummaryState ) {
            this._ampQasAddressService
                .getFormattedAddress( $event.Moniker, AddressFormatTypes.DDC )
                .subscribe( ( _formattedAddress : any ) => {
                    this.manualAddressCmp.updateControls( _formattedAddress );
                    this.$selected.emit( _formattedAddress );
                } );
        }
    }

    get isResidentialAddress () {
        return this.addressType === 'residential';
    }

    private customValidator = () : Function => {
        return ( c ) => {
            if ( c.value && c.value.length >= this.minTriggerLength && !this.selectedControl.value ) {
                return c.searchResult === null ? {
                    addressNotFound : {
                        text : c._ampErrors && c._ampErrors.addressNotFound ? c._ampErrors.addressNotFound : ''
                        // there is not text in this error because the text is html is provided as a template up in the amp-error
                        // but it can have text as well
                    }
                } : {
                    invalidAddress : {
                        text : c._ampErrors && c._ampErrors.invalidAddress ? c._ampErrors.invalidAddress : 'Please' +
                        ' select a valid address from the search results.'
                    }
                };
            } else {
                return null;
            }
        };
    };
}
