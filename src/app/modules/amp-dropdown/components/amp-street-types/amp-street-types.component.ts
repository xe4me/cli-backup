import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ViewChild , ChangeDetectorRef } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
@AmpComponent( {
    selector : 'amp-street-types'
} )
export class AmpStreetTypesComponent extends AmpDropdownComponent {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;

    constructor ( public _cd : ChangeDetectorRef ) {
        super( _cd );
        this.options  = [
            { value : 'Ally' , label : 'Alley' } ,
            { value : 'Arc' , label : 'Arcade' } ,
            { value : 'Ave' , label : 'Avenue' } ,
            { value : 'Bvd' , label : 'Boulevard' } ,
            { value : 'Bypa' , label : 'Bypass' } ,
            { value : 'Cct' , label : 'Circuit' } ,
            { value : 'Cl' , label : 'Close' } ,
            { value : 'Crn' , label : 'Corner' } ,
            { value : 'Ct' , label : 'Court' } ,
            { value : 'Cres' , label : 'Crescent' } ,
            { value : 'Cds' , label : 'Cul-de-sac' } ,
            { value : 'Dr' , label : 'Drive' } ,
            { value : 'Esp' , label : 'Esplanade' } ,
            { value : 'Grn' , label : 'Green' } ,
            { value : 'Gr' , label : 'Grove' } ,
            { value : 'Hwy' , label : 'Highway' } ,
            { value : 'Jnc' , label : 'Junction' } ,
            { value : 'Lane' , label : 'Lane' } ,
            { value : 'Link' , label : 'Link' } ,
            { value : 'Mews' , label : 'Mews' } ,
            { value : 'Pde' , label : 'Parade' } ,
            { value : 'Pl' , label : 'Place' } ,
            { value : 'Rdge' , label : 'Ridge' } ,
            { value : 'Rd' , label : 'Road' } ,
            { value : 'Sq' , label : 'Square' } ,
            { value : 'St' , label : 'Street' } ,
            { value : 'Tce' , label : 'Terrace' }
        ];
        this.required = true;
        this.label    = 'Street type';
        this.errors   = {
            required : 'Street type is a required field.'
        };
    }
}
