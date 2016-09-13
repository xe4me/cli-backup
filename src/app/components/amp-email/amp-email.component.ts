import { AmpComponent } from "../../decorators/amp-component.decorator";
import { AmpInputComponent } from "../amp-input/amp-input.component";
import { ChangeDetectorRef , ElementRef , Renderer } from "@angular/core";
@AmpComponent( {
    selector : 'amp-email'
} )
export class AmpEmailComponent extends AmpInputComponent {
    private _pattern            = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    private _maxLength          = 50;
    private _required : boolean = true;
    private label : string      = 'Email';

    constructor ( _cd : ChangeDetectorRef ,
                  _el : ElementRef ,
                  _renderer : Renderer ) {
        super( _cd , _el , _renderer );
    }

    private errors = {
        required : 'Email is a required field' ,
        pattern : 'The email is not valid'
    };
}