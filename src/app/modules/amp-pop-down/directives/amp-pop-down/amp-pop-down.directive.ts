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

    private domUtils = null;

    constructor( private dom : BrowserDomAdapter ,
                 private el : ElementRef ,
                 private renderer : Renderer) {
       this.domUtils = new DomUtils();
    }

    private toggle ( element ) {
        if (this.domUtils.isVisible(element)) {
            this.domUtils.toggle(element);
        } else {
            setTimeout(() => {
                this.domUtils.toggle(element);
            });
        }
    }

    private onClick = () : void => {
        let popDown = this.dom.query( this.target );
        this.toggle(popDown);
    }
}
