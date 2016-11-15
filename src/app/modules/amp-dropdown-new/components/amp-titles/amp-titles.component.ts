import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { ChangeDetectorRef , Renderer , ElementRef } from '@angular/core';
import { AmpDropdownComponent } from '../amp-dropdown/amp-dropdown.component';
@AmpComponent( {
    selector : 'amp-titles'
} )
export class AmpTitlesComponent extends AmpDropdownComponent {
    constructor ( public _el : ElementRef , public _cd : ChangeDetectorRef , public _renderer : Renderer ) {
        super( _el , _cd , _renderer );
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
