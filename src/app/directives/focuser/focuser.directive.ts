import { ElementRef , Renderer , Directive , EventEmitter , Input , AfterViewInit } from '@angular/core';
import { KeyCodes } from '../../util/key-kodes.utils';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
@Directive( {
    selector : '[focuser]' ,
    host     : {
        '(keydown)' : 'onKeydown($event)'
    } ,
    outputs  : [ 'focusOut' ]
} )
export class FocuserDirective implements AfterViewInit {
    @Input( 'focuser' ) parentEvent : EventEmitter<string>;
    @Input( 'hasList' ) hasList : boolean;
    private lastTabindex  = -1;
    private focusOut      = new EventEmitter<string>();
    private listElements;
    private liScrolHeight = 0;
    private domAdapter : BrowserDomAdapter;

    ngAfterViewInit () : any {
        this.parentEvent.subscribe( () => {
            this._renderer.invokeElementMethod( this._el.nativeElement , 'focus' , [] );
            if ( this.hasList ) {
                this.listElements = this.domAdapter.querySelectorAll( this._el.nativeElement , 'li' );
                if ( this.listElements && this.listElements.length > 0 ) {
                    this.liScrolHeight = this.domAdapter.getProperty( this.listElements[ 0 ] , 'scrollHeight' );
                    this.next();
                }
            }
        } );
        return undefined;
    }

    constructor ( private _el : ElementRef , private _renderer : Renderer ) {
        this.domAdapter = new BrowserDomAdapter();
    }

    private onKeydown ( $event ) {
        if ( !this.hasList ) {
            return;
        }
        let keyCode = $event.keyCode;
        if ( keyCode === KeyCodes.DOWN ) {
            this.next();
        } else if ( keyCode === KeyCodes.UP ) {
            this.prev();
        } else {
            $event.preventDefault();
        }
    }

    private prev () {
        this.lastTabindex--;
        if ( this.lastTabindex === -1 ) {
            this.onFocusOut();
            return;
        }
        this.setScrollTopAndFocus();
    }

    private next () {
        if ( this.lastTabindex === this.listElements.length - 1 ) {
            return;
        }
        this.lastTabindex++;
        this.setScrollTopAndFocus();
    }

    private setScrollTopAndFocus () {
        this._renderer.setElementProperty( this._el.nativeElement , 'scrollTop' , this.lastTabindex * this.liScrolHeight );
        this._renderer.invokeElementMethod( this.listElements[ this.lastTabindex ] , 'focus' , [] );
    }

    private onFocusOut () {
        this.focusOut.emit( 'focus out' );
    }
}
