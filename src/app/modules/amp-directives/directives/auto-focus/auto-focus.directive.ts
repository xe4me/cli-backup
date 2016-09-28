import { Directive , Input , ElementRef } from '@angular/core';
@Directive( {
    selector : '[autoFocus]' ,
    inputs   : [ 'autoFocus' ]
} )
export class AutoFocusDirective {
    @Input( 'delay' ) delay = 1200;

    private set autoFocus ( _shouldFocus ) {
        if ( _shouldFocus ) {
            setTimeout( () => {
                this._el.nativeElement.getElementsByTagName( 'input' )[ 0 ].focus();
            } , this.delay );
        }
    }

    constructor ( private _el : ElementRef ) {
    }
}
