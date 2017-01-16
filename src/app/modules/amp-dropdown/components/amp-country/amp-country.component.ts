import {
    ChangeDetectorRef,
    Renderer,
    AfterViewInit,
    ElementRef
} from '@angular/core';
import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
import { AmpCountryService } from '../../services/amp-country.service';
@AmpComponent( {
    selector : 'amp-country'
} )
export class AmpCountryComponent extends AmpDropdownComponent implements AfterViewInit {
    constructor ( public _el : ElementRef , public _cd : ChangeDetectorRef ,
                  public ampCountryService : AmpCountryService ,
                  public _renderer : Renderer ) {
        super( _el , _cd , _renderer );
        this.fieldItemKey  = 'countryCode';
        this.fieldValueKey = 'country';
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
    }

    ngAfterViewInit () : any {
        super.ngAfterViewInit();
        // pre selecting as per requirements , it should always be Australia if it does not have value (hasn't been
        // retrieved)
        if ( this.control.value === null ) {
            this.control.setValue( 'Australia' );
        }
        let subs =
            this.ampCountryService
                .getCountries()
                .subscribe( ( res : any ) => {
                    this.options = res;
                    if ( this.control.value === null ) {
                        this.control.setValue( 'Australia' );
                    }
                    if ( subs ) {
                        subs.unsubscribe();
                    }
                } );
        return undefined;
    }
}
