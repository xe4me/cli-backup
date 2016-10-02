import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ChangeDetectorRef , ElementRef , Renderer , ViewChild } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
@AmpComponent( {
    selector : 'amp-states'
} )
export class AmpStatesComponent extends AmpDropdownComponent {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;

    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
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
