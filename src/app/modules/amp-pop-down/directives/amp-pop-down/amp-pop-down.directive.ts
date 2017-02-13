import {
    Directive ,
    ElementRef ,
    Input ,
    Renderer
} from '@angular/core';

import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';

@Directive({
    selector: '[amp-pop-down-toggle]' ,
    host     : {
        '(click)' : 'onClick($event)'
    }
})

export class AmpPopDownDirective {

    @Input( 'amp-pop-down-toggle' ) target : string;

    constructor( private dom : BrowserDomAdapter,
                 private el : ElementRef,
                 private renderer : Renderer ) {
    }

    private toggle( element ) {
        if ( DomUtils.isVisible( element ) ) {
            DomUtils.toggle( element );
        } else {
            setTimeout( () => {
                DomUtils.toggle( element );
            } );
        }
    }

    private onClick = () : void => {
        let popDown = this.dom.query( this.target );
        this.toggle(popDown);
    }
}
