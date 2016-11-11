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
                'value' : 'Miss' ,
                'label' : 'Miss'
            } ,
            {
                'value' : 'Mr' ,
                'label' : 'Mr'
            } ,
            {
                'value' : 'Mrs' ,
                'label' : 'Mrs'
            } ,
            {
                'value' : 'Ms' ,
                'label' : 'Ms'
            } ,
            {
                'value' : 'Dr' ,
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
