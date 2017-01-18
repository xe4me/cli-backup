import {
    AfterViewInit ,
    Component ,
    Input ,
    OnDestroy ,
    OnInit ,
    ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ScrollService } from '../../../../../app/services/scroll/scroll.service';

import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';

@Component( {
    selector : 'amp-form-block' ,
    host     : {
        '[attr.id]'           : 'context?.selectorName' ,
        '[attr.data-section]' : 'context?.__sectionName'
    } ,
    template : require( './amp-form-block.component.html' ),
    styles     : [ require( './amp-form-block.component.scss' ) ]
} )
export class AmpFormBlockComponent implements OnInit , AfterViewInit , OnDestroy {
    @Input( 'context' ) context;
    @Input( 'withOkButton' ) withOkButton          = true;
    @Input( 'withOverlay' ) withOverlay            = true;
    @Input( 'theme' ) theme;
    @Input( 'buttonsTheme' ) buttonsTheme;
    @Input( 'headingClass' ) headingClass : string = '';
    @ViewChild( 'formBlock' ) formBlock;

    private domUtils = null;
    private scrollSubscription : Subscription;

    constructor( private scrollService : ScrollService ) {
       this.domUtils = new DomUtils();
    }

    public ngOnInit () : any {
        if ( ! this.context ) {
            console.error( 'Most of the amp-form-block functionalities would not be working because you have not' +
                ' passed in the context ' );
        }

        return undefined;
    }

    public ngAfterViewInit () : any {
        this.subscribeToScrollEvents();
    }

    public ngOnDestroy () {
        this.unSubscribeFromEvents();
    }

    private onKeyupEnter ( event ) {
        if ( event.target.tagName.toLowerCase() !== 'textarea' &&
             !this.domUtils.hasClass(event.target, 'amp-dropdown-control') ) {
            if (this.context.canGoNext) {
                this.context.onNext();
            } else {
                this.focusOnControl();
            }
        }
    }

    private firstFocusableControl () {
        let formBlock = this.formBlock.nativeElement;
        let focusableElements = formBlock.querySelectorAll('input:not([disabled]), textarea:not([disabled])');
        let control = null;

        for ( let el of focusableElements ) {
            if ( this.domUtils.isVisible(el) && this.shouldFocusOnControl(el) ) {
                control = el;
                break;
            }
        }

        return control;
    }

    private focusOnControl () {
        let formBlock = this.formBlock.nativeElement;
        let control = this.firstFocusableControl() || formBlock.querySelector('.js-heading');

        if ( control ) {
            control.focus();
        }
    }

    private shouldFocusOnControl (el) {
        return this.domUtils.hasClass(el, 'ng-invalid') ||
              (this.domUtils.hasClass(el, 'ng-valid') && this.domUtils.hasClass(el, 'ng-untouched'));
    }

    private subscribeToScrollEvents () {
        this.scrollSubscription = this.scrollService.$scrolled.subscribe( ( changes ) => {
            if ( changes.componentSelector && changes.componentSelector === this.context.selectorName ) {
                this.focusOnControl();
            }
        });
    }

    private unSubscribeFromEvents () {
        if ( this.scrollSubscription ) {
            this.scrollSubscription.unsubscribe();
        }
    }
}
