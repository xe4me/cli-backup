import {
    Directive,
    Input,
    ElementRef
} from '@angular/core';
@Directive( {
    selector : '[auto-focus-on]'
} )
export class AutoFocusOnDirective {
    @Input( 'delay' ) delay = 0;
    @Input( 'auto-focus-on' ) autoFocusOn;

    constructor ( private _el : ElementRef ) {
    }

    public focus () {
        setTimeout( () => {
            let elements = this._el.nativeElement.getElementsByTagName( this.autoFocusOn || 'input' );
            let element  = elements ? elements[ 0 ] : null;
            if ( element ) {
                element.focus();
            }
        }, this.delay );
    }
}
