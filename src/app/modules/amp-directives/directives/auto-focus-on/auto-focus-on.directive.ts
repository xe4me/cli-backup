import { Directive , Input , ElementRef } from '@angular/core';
@Directive( {
    selector : '[auto-focus-on]'
} )
export class AutoFocusOnDirective {
    @Input( 'delay' ) delay               = 0;
    @Input( 'auto-focus-on' ) autoFocusOn = 'input';

    constructor ( private _el : ElementRef ) {
    }

    public focus () {
        setTimeout( () => {
            this._el.nativeElement.getElementsByTagName( this.autoFocusOn )[ 0 ].focus();
        } , this.delay );
    }
}
