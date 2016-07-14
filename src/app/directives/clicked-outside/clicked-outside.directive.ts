import { ElementRef , Directive , EventEmitter , Input } from '@angular/core';
@Directive( {
    selector : '[clicked-outside]' ,
    host     : {
        '(document:click)' : 'onClick($event)'
    } ,
    outputs  : [ 'outsideClick' ]
} )
export class ClickedOutsideDirective {
    @Input( 'clicked-outside' ) callback : Function;
    private outsideClick : EventEmitter<boolean>;

    constructor ( private _el : ElementRef ) {
        this.outsideClick = new EventEmitter<boolean>();
    }

    private onClick ( event : any ) {
        if ( this.clickedOutside( event ) ) {
            this.outsideClick.emit( true );
            if ( this.callback ) {
                this.callback();
            }
        }
    }

    private clickedOutside ( event : any ) {
        let clickedTarget = event.target;
        let host          = this._el.nativeElement;
        do {
            if ( clickedTarget === host ) {
                return false;
            }
            clickedTarget = clickedTarget.parentNode;
        } while ( clickedTarget );
        return true;
    }
}