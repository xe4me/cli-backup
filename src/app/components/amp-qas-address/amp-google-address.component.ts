import {
    Component ,
    NgZone ,
    AfterViewInit ,
    ChangeDetectorRef , EventEmitter
} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { AmpInputComponent } from '../amp-input/amp-input.component';
declare var google : any;
@Component( {
    selector   : 'amp-google-address' ,
    template   : `
    <amp-input
        class='1/1'
        [id]='id'
        [label]='label'
        [labelHidden]='labelHidden'
        [controlGroup]='controlGroup'
        [customValidator]='customValidator'
        [required]='required'
        [placeholder]='placeholder'
        [errors]='errors'
        [isInSummaryState]='isInSummaryState'
        [pattern]='pattern'
        [maxLength]='maxLength'
        (input)='showManualAddrOpt()'>
    </amp-input>
    ` ,
    styles     : [ require( './amp-google-address.component.scss' ).toString() ] ,
    inputs     : [
        'id' ,
        'label' ,
        'controlGroup' ,
        'errors' ,
        'customValidator' ,
        'placeholder' ,
        'maxLength' ,
        'pattern' ,
        'required' ,
        'isInSummaryState' ,
        'labelHidden'
    ] ,
    outputs    : [ 'address' , 'predictions' ] ,
    directives : [ AmpInputComponent ]
} )
export class AMPGoogleAddressComponent implements AfterViewInit {
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

    public addrPredictions : any            = {};
    public addrPlace : any                  = {};
    private id : string;
    private label : string;
    private controlGroup : FormGroup;
    private customValidator : Function;
    private placeholder : string            = '';
    private model : any;
    private autocomplete : any;
    private isInSummaryState : boolean;
    private labelHidden : boolean           = false;
    private address : EventEmitter<any>     = new EventEmitter<any>();
    private predictions : EventEmitter<any> = new EventEmitter<any>();

    constructor ( private zone : NgZone , public _cd : ChangeDetectorRef ) {
    }

    get control () {
        return (<FormControl> this.controlGroup.controls[ this.id ]);
    }

    ngAfterViewInit () {
        // Binding Google Places Address api to google_places_ac input field
        let input : any   = document.getElementById( this.id + '-input' );
        let options       = {
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
                    this.control.setValue( this.addrPlace.formatted_address );
                    this.address.emit( this.addrPlace );
                }
            } );
        } );
    }

    showManualAddrOpt () {
        let service = new google.maps.places.AutocompleteService();
        // Clear the addrPlace internal value, if the input do not match the addrPlace
        if ( this.addrPlace && this.control.value !== this.addrPlace.formatted_address ) {
            this.addrPlace = null;
        }
        if ( this.control.value ) {
            service.getPlacePredictions(
                {
                    input                 : this.control.value ,
                    types                 : [ 'address' ] ,
                    componentRestrictions : { country : 'au' }
                } ,
                ( predictions , status ) => {
                    if ( status === google.maps.places.PlacesServiceStatus.OK ||
                        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS ) {
                        this.addrPredictions = predictions;
                        this.predictions.emit( predictions );
                        this._cd.detectChanges();
                    }
                } );
        }
    }
}
