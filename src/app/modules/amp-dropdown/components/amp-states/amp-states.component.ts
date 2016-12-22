import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ChangeDetectorRef , Renderer , ElementRef } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
@AmpComponent( {
    selector : 'amp-states'
} )
export class AmpStatesComponent extends AmpDropdownComponent {
    constructor ( public _el : ElementRef , public _cd : ChangeDetectorRef , public _renderer : Renderer ) {
        super( _el , _cd , _renderer );
        this.options  = [
            { value : 'ACT' , label : 'ACT' } ,
            { value : 'NSW' , label : 'NSW' } ,
            { value : 'NT' , label : 'NT' } ,
            { value : 'QLD' , label : 'QLD' } ,
            { value : 'SA' , label : 'SA' } ,
            { value : 'TAS' , label : 'TAS' } ,
            { value : 'VIC' , label : 'VIC' } ,
            { value : 'WA' , label : 'WA' } ,
        ];
        this.required = true;
        this.label    = 'State';
        this.errors   = {
            required : 'State is a required field.'
        };
    }
}
