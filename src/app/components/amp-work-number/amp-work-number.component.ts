import { AmpComponent } from "../../decorators/amp-component.decorator";
import { AmpInputComponent } from "../amp-input/amp-input.component";
import { ChangeDetectorRef , ElementRef , Renderer } from "@angular/core";
@AmpComponent( {
    selector : 'amp-work-number'
} )
export class AmpWorkNumberComponent extends AmpInputComponent {
    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
        this.pattern   = '^([\\s()+-]*\\d){8,}$';
        this.maxLength = 20;
        this.required  = true;
        this.label     = 'Work number';
        this.errors    = {
            required : 'Work number is a required field.' ,
            pattern  : 'The work number must contain a minimum of 8 characters. Only numeric and area code characters are allowed.'
        };
    }
}