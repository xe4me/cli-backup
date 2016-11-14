import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ChangeDetectorRef , Renderer } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
@AmpComponent( {
    selector : 'amp-street-types'
} )
export class AmpStreetTypesComponent extends AmpDropdownComponent {
    constructor ( public _cd : ChangeDetectorRef , public _renderer : Renderer ) {
        super( _cd , _renderer );
        this.options = [
            { value : 'ALLY' , label : 'Alley' } ,
            { value : 'ARC' , label : 'Arcade' } ,
            { value : 'AVE' , label : 'Avenue' } ,
            { value : 'BVD' , label : 'Boulevard' } ,
            { value : 'BYPA' , label : 'Bypass' } ,
            { value : 'CCT' , label : 'Circuit' } ,
            { value : 'CL' , label : 'Close' } ,
            { value : 'CRN' , label : 'Corner' } ,
            { value : 'CT' , label : 'Court' } ,
            { value : 'CRES' , label : 'Crescent' } ,
            { value : 'CDS' , label : 'Cul-de-sac' } ,
            { value : 'DR' , label : 'Drive' } ,
            { value : 'ESP' , label : 'Esplanade' } ,
            { value : 'GRN' , label : 'Green' } ,
            { value : 'GR' , label : 'Grove' } ,
            { value : 'HWY' , label : 'Highway' } ,
            { value : 'JNC' , label : 'Junction' } ,
            { value : 'LANE' , label : 'Lane' } ,
            { value : 'LINK' , label : 'Link' } ,
            { value : 'MEWS' , label : 'Mews' } ,
            { value : 'PDE' , label : 'Parade' } ,
            { value : 'PL' , label : 'Place' } ,
            { value : 'RDGE' , label : 'Ridge' } ,
            { value : 'RD' , label : 'Road' } ,
            { value : 'SQ' , label : 'Square' } ,
            { value : 'ST' , label : 'Street' } ,
            { value : 'TCE' , label : 'Terrace' }
        ];
        this.label   = 'Street type';
    }
}
