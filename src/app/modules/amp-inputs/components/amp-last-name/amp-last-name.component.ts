import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';
import { ChangeDetectorRef , ElementRef , Renderer , ViewChild } from '@angular/core';
@AmpComponent( {
    selector : 'amp-last-name'
} )
export class AmpLastNameComponent extends AmpInputComponent {
    @ViewChild( 'input' ) inputCmp;
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.maxLength = 20;
        this.required  = true;
        this.label     = 'Last name';
        this.errors    = {
            required : 'Last name is a required field.'
        };
    }
}
