import { ElementRef , Renderer , Directive , EventEmitter , Input , AfterViewInit } from '@angular/core';
import { KeyCodes } from '../../../amp-utils';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Directive( {
    selector : '[focuser]' ,
    host     : {
        '(keydown)' : 'onKeydown($event)'
    } ,
    outputs  : [ 'focusOut' ]
} )
export class FocuserDirective {
    @Input( 'focuser' ) focuser : string;
    private lastTabindex   = - 1;
    private focusOut       = new EventEmitter<string>();
    private listElements;
    private liScrollHeight = 0;
    private domAdapter : BrowserDomAdapter;
    private inputElem;

    constructor ( private _el : ElementRef , private _renderer : Renderer ) {
        this.domAdapter = new BrowserDomAdapter();
    }

    focus ( keyCode : number ) {
        if ( this.focuser ) {
            if ( ! this.inputElem ) {
                this.inputElem = this.domAdapter.querySelector( this._el.nativeElement , this.focuser );
            }
            if ( this.inputElem ) {
                this._renderer.invokeElementMethod( this.inputElem , 'focus' , [] );
            }
        } else {
            this._renderer.invokeElementMethod( this._el.nativeElement , 'focus' , [] );
        }
        if ( this.focuser === 'list' ) {
            this.listElements = this.domAdapter.querySelectorAll( this._el.nativeElement , 'li' );
            if ( this.listElements && this.listElements.length > 0 ) {
                this.liScrollHeight = this.domAdapter.getProperty( this.listElements[ 0 ] , 'scrollHeight' );
                let activeElem      = this.domAdapter.querySelector( this._el.nativeElement , 'li.active' );
                switch ( keyCode ) {
                    case KeyCodes.DOWN:
                        this.lastTabindex = this.getTabndexFromActiveElement( activeElem ) || - 1;
                        this.next();
                        break;
                    case KeyCodes.UP:
                        this.lastTabindex = this.getTabndexFromActiveElement( activeElem ) || (this.listElements ? this.listElements.length : - 1);
                        this.prev();
                        break;
                    default:
                        this.lastTabindex = - 1;
                        this.next();
                }
            }
        }
    }

    private onKeydown ( $event ) {
        if ( this.focuser !== 'list' ) {
            return;
        }
        let keyCode = $event.keyCode;
        if ( keyCode === KeyCodes.LEFT || keyCode === KeyCodes.BACKSPACE ) {
            this.onFocusOut( keyCode );
        } else if ( keyCode === KeyCodes.DOWN ) {
            this.next();
        } else if ( keyCode === KeyCodes.UP ) {
            this.prev();
        } else {
            $event.preventDefault();
        }
    }

    private prev () {
        this.lastTabindex --;
        if ( this.lastTabindex === - 1 ) {
            this.onFocusOut( KeyCodes.UP );
            return;
        }
        this.setScrollTopAndFocus();
    }

    private next () {
        if ( this.lastTabindex === this.listElements.length - 1 ) {
            this.lastTabindex = 0;
        }
        if ( this.lastTabindex >= this.listElements.length ) {
            this.lastTabindex = 0;
        }
        this.lastTabindex ++;
        this.setScrollTopAndFocus();
    }

    private setScrollTopAndFocus () {
        this._renderer.setElementProperty( this._el.nativeElement , 'scrollTop' , this.lastTabindex * this.liScrollHeight );
        this._renderer.invokeElementMethod( this.listElements[ this.lastTabindex ] , 'focus' , [] );
    }

    private onFocusOut ( _keyCode ) {
        this.focusOut.emit( _keyCode );
    }

    private getTabndexFromActiveElement ( activeElem ) {
        return activeElem ? <number> activeElem.getAttribute( 'tabindex' ) - 1 : activeElem;
    }
}
