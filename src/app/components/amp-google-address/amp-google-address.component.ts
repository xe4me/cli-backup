import {
    Component ,
    Directive ,
    Input ,
    OnInit ,
    ViewEncapsulation ,
    NgZone ,
    AfterViewInit ,
    ChangeDetectorRef
} from 'angular2/core';
import { Control , Validators , CORE_DIRECTIVES , FORM_DIRECTIVES } from 'angular2/common';
import { FormBlock , NamedControl } from '../../blocks/formBlock';
import { Action } from 'amp-ddc-ui-core/src/app/actions/action';
import { MdInputComponent } from '../../components/my-md-input/my-md-input.component';
declare var google : any;
@Component( {
    selector      : 'amp-google-address' ,
    template      : `
    <my-md-input
        class='3/5'
        [id]='id'
        [label]='label'
        [parentControl]='parentControl'
        [placeholder]='placeholder'
        [isInSummaryState]='isInSummaryState'
        valPattern='{{valPattern}}'
        valMaxLength='{{valMaxLength}}'
        (input)='showManualAddrOpt()'>
    </my-md-input>
    ` ,
    styles        : [ require( './amp-google-address.component.scss' ).toString() ] ,
    inputs        : [
        'id' ,
        'label' ,
        'parentControl' ,
        'placeholder' ,
        'visibility' ,
        'valMaxLength' ,
        'valPattern' ,
        'isRequired' ,
        'isInSummaryState'
    ] ,
    directives    : [ MdInputComponent ] ,
    encapsulation : ViewEncapsulation.Emulated
} )
export class AMPGoogleAddressComponent implements AfterViewInit {
    static CLASS_NAME = 'AMPGoogleAddressComponent';
    public addrPredictions : any = {};
    public addrPlace : any       = {};
    private id : string;
    private label : string;
    private parentControl : Control;
    private placeholder : string = '';
    private visibility : Action;
    private model : any;
    private autocomplete : any;
    private isInSummaryState : boolean;

    static getAddressComponent ( types : Array<string> ,
                                 getShortName : boolean ,
                                 addressComponent : Array<any> ) : string {
        let addr_comp = null;
        if ( addressComponent && types ) {
            // Concat address components found for each types
            addr_comp = types.reduce( function( type_prev , type_cur , type_index , type_arr ) {
                // Concat address components found for each type
                return type_prev + ' ' + addressComponent.reduce( function( addr_prev ,
                                                                            addr_cur ,
                                                                            addr_index ,
                                                                            addr_arr ) {
                        if ( addr_cur.types.indexOf( type_cur ) > - 1 ) {
                            return (addr_prev + ' ' + (getShortName ? addr_cur.short_name : addr_cur.long_name)).trim();
                        } else {
                            return addr_prev;
                        }
                    } , '' );
            } , '' );
        }
        return (addr_comp ? addr_comp.trim() : null);
    }

    constructor ( private zone : NgZone , public _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {
        // Binding Google Places Address api to google_places_ac input field
        var input : any = document.getElementById( this.id );
        var options     = {
            types                 : [ 'address' ] ,
            componentRestrictions : { country : 'au' }
        };
        // TODO: Remove the UI components as we are using the AutocompleteService programmatically.
        this.autocomplete = new google.maps.places.Autocomplete( input , options );
        google.maps.event.addListener( this.autocomplete , 'place_changed' , () => {
            this.zone.run( () => {
                if ( ! this.autocomplete.getPlace().formatted_address ) {
                    console.log( 'Google address returned an address without details!' , this.autocomplete.getPlace().name );
                }
                this.addrPlace = this.autocomplete.getPlace();
                if ( this.addrPlace ) {
                    this.parentControl.updateValue( this.addrPlace.formatted_address );
                }
            } );
        } );
    }

    showManualAddrOpt () {
        var service = new google.maps.places.AutocompleteService();
        // Clear the addrPlace internal value, if the input do not match the addrPlace
        if ( this.addrPlace && this.parentControl.value !== this.addrPlace.formatted_address ) {
            this.addrPlace = null;
        }
        if ( this.parentControl.value ) {
            service.getPlacePredictions(
                {
                    input                 : this.parentControl.value ,
                    types                 : [ 'address' ] ,
                    componentRestrictions : { country : 'au' }
                } ,
                ( predictions , status ) => {
                    if ( status === google.maps.places.PlacesServiceStatus.OK ||
                        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS ) {
                        this.addrPredictions = predictions;
                        this._cd.detectChanges();
                    }
                } );
        }
    }
}
