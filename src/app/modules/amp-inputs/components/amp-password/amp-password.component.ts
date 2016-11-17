import { AmpComponent } from '../../../../decorators/amp-component.decorator';
import { AmpInputComponent } from '../amp-input/amp-input.component';
import { ChangeDetectorRef , ElementRef , Renderer , ViewChild } from '@angular/core';
@AmpComponent( {
    selector : 'amp-password'
} )
export class AmpPasswordComponent extends AmpInputComponent {
    @ViewChild( 'input' ) inputCmp;
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.maxLength = 30;
        this.required  = true;
        this.type = 'password';
        this.label     = 'Password';
        this.errors    = {
            required : 'Password is a required field.'
        };
    }
}
