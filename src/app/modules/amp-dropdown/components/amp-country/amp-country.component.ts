import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ViewChild , OnInit , ChangeDetectorRef } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
import { AmpCountryService } from '../../services/amp-country.service';
@AmpComponent( {
    selector : 'amp-country'
} )
export class AmpCountryComponent extends AmpDropdownComponent implements OnInit {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;

    constructor ( public _cd : ChangeDetectorRef , public ampCountryService : AmpCountryService ) {
        super( _cd );
        this.fieldItemKey  = 'country';
        this.fieldValueKey = 'countryCode';
        this.options       = [
            {
                countryCode : 'AUS' ,
                country     : 'Australia'
            } ,
            {
                countryCode : 'NZL' ,
                country     : 'New Zealand'
            }
        ];
        this.label         = 'Country';
        this.required      = true;
        this.errors        = {
            required : 'Country is a required field.'
        };
        this.preselect     = 'AUS';
    }

    ngOnInit () : any {
        super.ngOnInit();
        this.ampCountryService
            .getCountries()
            .subscribe( ( res : any ) => {
                this.options   = res;
                this.preselect = 'AUS';
            } , ( error : any ) => {
                console.log( error );
            } );
        return undefined;
    }
}
