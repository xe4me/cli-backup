import { Directive , ElementRef , Input , Renderer } from 'angular2/core';
import { AfterViewInit , OnDestroy } from 'angular2/src/core/linker/interfaces';
import { Ruler } from 'angular2/src/platform/browser/ruler';
import * as browser from 'angular2/platform/browser';
@Directive( {
    selector : '[sticky-on-scroll]' ,
    host     : {
        '(window:scroll)' : 'onScroll($event)'
    }
} )
export class AmpStickyOnScrollDirective implements AfterViewInit {
    @Input( 'sticky-on-scroll' ) shouldStick : Function;
    private initialPosition : string;
    private initialTop : string;
    private domAdapter;
    private ruler;
    private measure;
    private sticked : boolean = false;

    ngAfterViewInit () : any {
        this.initialPosition = this.domAdapter.getStyle( this.el.nativeElement , 'position' ) || 'initial';
        this.initialTop      = this.domAdapter.getStyle( this.el.nativeElement , 'top' ) || '0';
        return undefined;
    }

    constructor ( private el : ElementRef ,
                  private renderer : Renderer ) {
        this.domAdapter = new browser.BrowserDomAdapter();
        this.ruler      = new Ruler( this.domAdapter );
    }

    private onScroll () {
        if ( this.shouldStick() ) {
            this.stick();
        } else {
            this.unstick();
        }
    }

    private stick () {
        if ( this.sticked === false ) {
            this
                .ruler
                .measure( this.el )
                .then( ( rect ) => {
                    let top = rect.top;
                    this.renderer.setElementStyle( this.el.nativeElement , 'position' , 'fixed' );
                    this.renderer.setElementStyle( this.el.nativeElement , 'top' , top + 'px' );
                    this.sticked = true;
                } );
        }
    }

    private unstick () {
        if ( this.sticked === true ) {
            this.renderer.setElementStyle( this.el.nativeElement , 'position' , this.initialPosition );
            this.renderer.setElementStyle( this.el.nativeElement , 'top' , this.initialTop + 'px' );
            this.sticked = false;
        }
    }
}
