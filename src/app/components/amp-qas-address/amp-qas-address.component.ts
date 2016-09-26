import { FormGroup , FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import { RequestOptions , Headers , Http } from "@angular/http";
import { AmpAutoCompleteComponent } from "../amp-autocomplete/amp-autocomplete.component";
import { AmpErrorComponent , AmpErrorItemComponent } from "../amp-error/amp-error.component";
import { Input } from "@angular/core";
import { Component , Input } from "@angular/core";
@Component( {
    selector   : 'amp-qas-address' ,
    template   : `
        <amp-auto-complete
                class="1/1"
                [controlGroup]="controlGroup"
                [required]="required"
                [errors]="errors"
                [minTriggerLength]="minTriggerLength"
                [customValidator]="customValidator"
                [queryServiceCall]="queryServiceCall"
                [isInSummaryState]="isInSummaryState"
                [id]="id"
                (selected)="onOptionSelect($event)"
                [selectedItemIdentifier]="'Moniker'"
                [selectedItemValueIdentifier]="'PartialAddress'"
                [label]='label'>
            <template let-option="option">
                {{ option.PartialAddress }}
            </template>
        </amp-auto-complete>
        <amp-error [controlGroup]="controlGroup" >
            <template let-error="error">
                <error-item [error]="error" selector="addressNotFound">
                    We are unable to find your address. Try again or tell us your address line by line <a (click)='showManualAddrForm()'>here</a> instead.
                </error-item>
            </template>
        </amp-error>
        
        <br><br><br><pre>
        [ {{ controlGroup.value | json }} ]
</pre>
    ` ,
    styles     : [ require( './amp-qas-address.component.scss' ).toString() ] ,
    directives : [
        AmpAutoCompleteComponent ,
        AmpErrorComponent ,
        AmpErrorItemComponent
    ]
} )
export class AmpQasAddressComponent {
    @Input() id                = 'default-qas-id';
    @Input() selectedControlId = 'default-selected-control-id';
    @Input() label             = 'Default qas label';
    @Input() controlGroup      = new FormGroup( {} );
    @Input() errors            = {
        required : 'Address is a required field.'
    };
    @Input() placeholder       = 'Default place holder';
    @Input() required          = false;
    @Input() isInSummaryState  = false;
    @Input() minTriggerLength  = 3;
    @Input() qasQueryUrl       = 'http://localhost:8082/ddc/secure/api/qas/doSearch/AUS';
    @Input() qasFormatterUrl   = 'http://localhost:8082/ddc/secure/api/nio/addressFormatter';
    //private _qasQueryUrl   = 'http://localhost:1234/addressList';
    get selectedControl () {
        if ( this.controlGroup && this.controlGroup.contains( this.id + '-selected-item' ) ) {
            return this.controlGroup.controls[ this.id + '-selected-item' ];
        }
    };

    private selectedOption  = {};
    private customValidator = () : any => {
        return ( c ) => {
            if ( c.value && c.value.length >= this.minTriggerLength && ! this.selectedControl.value ) {
                if ( c.searchResult === null ) {
                    return {
                        addressNotFound : {
                            text : ''
                        }
                    };
                } else {
                    return {
                        invalidAddress : {
                            text : 'This address is not valid.'
                        }
                    };
                }
            } else {
                return null;
            }
        };
    };

    constructor ( private http : Http ) {
    }

    private queryServiceCall = ( queryValue : string ) : Observable<any> => {
        let headers : Headers = new Headers( {
            'Content-Type' : 'application/json' ,
        } );
        let options           = new RequestOptions( { body : '' , headers : headers } );
        let url               = this.qasQueryUrl + '/' + queryValue;
        return this
            .http
            .get( url , options )
            .map( res => {
                let re = res.json();
                if ( re.payload.QAPicklist.Total && re.payload.QAPicklist.Total > 0 ) {
                    return re.payload.QAPicklist.PicklistEntry
                } else {
                    return null;
                }
            } );
        // .catch(this.handleError);
    };

    public showManualAddrForm () {
        alert( 'Show manual' );
    }

    private onOptionSelect ( option ) {
        this.selectedOption = option;
    }
}