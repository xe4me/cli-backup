import { AmpComponent } from "../../decorators/amp-component.decorator";
import { AmpInputComponent } from "../amp-input/amp-input.component";
import { ChangeDetectorRef , ElementRef , Renderer } from "@angular/core";
@AmpComponent( {
    selector : 'amp-mobile-number'
} )
export class AmpMobileNumberComponent extends AmpInputComponent {
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.pattern   = '^([\\s()+-]*\\d){10,}$';
        this.maxLength = 20;
        this.required  = true;
        this.label     = 'Mobile';
        this.errors    = {
            required : 'Mobile is a required field.' ,
            pattern  : 'The mobile must contain a minimum of 10 characters. Only numeric and area code characters are allowed.'
        };
    }
}