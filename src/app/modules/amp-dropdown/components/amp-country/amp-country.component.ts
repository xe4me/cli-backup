import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ViewChild , OnInit } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
import { AmpCountryService } from '../../services/amp-country.service';
@AmpComponent( {
    selector : 'amp-country'
} )
export class AmpCountryComponent extends AmpDropdownComponent implements OnInit {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;

    constructor ( public ampCountryService : AmpCountryService ) {
        super();
        this.required      = true;
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
        this.errors        = {
            required : 'Coountry is a required field.'
        };
    }

    ngOnInit () : any {
        super.ngOnInit();
        this.ampCountryService
            .getCountries()
            .subscribe( ( res : any ) => {
                this.options = res;
            } , ( error : any ) => {
                console.log( error );
            } );
        return undefined;
    }
}
