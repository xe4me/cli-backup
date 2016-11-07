import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ViewChild , ChangeDetectorRef } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
@AmpComponent( {
    selector : 'amp-titles'
} )
export class AmpTitlesComponent extends AmpDropdownComponent {
    @ViewChild( 'selectEl' ) selectEl;
    @ViewChild( 'optionsEl' ) optionsEl;
    @ViewChild( 'dropdownEl' ) dropDownEl;

    constructor ( public _cd : ChangeDetectorRef ) {
        super( _cd );
        this.options  = [
            {
                'value' : 'miss' ,
                'label' : 'Miss'
            } ,
            {
                'value' : 'mr' ,
                'label' : 'Mr'
            } ,
            {
                'value' : 'mrs' ,
                'label' : 'Mrs'
            } ,
            {
                'value' : 'ms' ,
                'label' : 'Ms'
            } ,
            {
                'value' : 'dr' ,
                'label' : 'Dr'
            }
        ];
        this.required = true;
        this.label    = 'Title';
        this.errors   = {
            required : 'Title is a required field.'
        };
    }
}
