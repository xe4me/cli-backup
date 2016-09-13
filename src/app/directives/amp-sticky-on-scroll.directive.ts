import { Directive , ElementRef , Input , Renderer } from '@angular/core';
import { AfterViewInit , OnDestroy } from '@angular/core';
import { Ruler } from '../util/Ruler';
// import * as browser from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

import { ChangeDetectionStrategy } from '@angular/core';
import { NgZone } from '@angular/core';
import { DomEventsPlugin } from '@angular/platform-browser/src/dom/events/dom_events';
import { EventManager } from '@angular/platform-browser';
@Directive( {
    selector : '[sticky-on-scroll]'
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
        this.zone.runOutsideAngular( () => {
            const manager =
                      new EventManager( [ new DomEventsPlugin() ] , new NgZone( { enableLongStackTrace : false } ) );
            manager.addGlobalEventListener( 'window' , 'scroll' , ( e ) => {
                this.onScroll();
            } );
        } );
        return undefined;
    }

    constructor ( private zone : NgZone ,
                  private el : ElementRef ,
                  private renderer : Renderer ) {
        this.domAdapter = new BrowserDomAdapter();
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