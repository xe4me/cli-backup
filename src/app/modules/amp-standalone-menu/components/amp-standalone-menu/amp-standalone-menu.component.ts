import {
    Component,
    ChangeDetectorRef,
    ViewChild,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';
@Component( {
    selector        : 'amp-standalone-menu',
    template        : require( './amp-standalone-menu.component.html' ),
    styles          : [ require( './amp-standalone-menu.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush,
    animations : [
        trigger(
            'openClosed',
            [
                state( 'closed, void', style( {
                    height       : '*'
                } ) ),
                state( 'open', style( {
                    height       : '100%'
                } ) ),
                transition(
                    'closed <=> open', [ animate('450ms ease-in') ] )
            ] )
    ]
} )
export class AmpStandAloneMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild( 'menu' ) menu;
    // Selector of the main page content to show/hide content in mobile view.
    @Input() mainContentSelector : string = 'main';
    @Input() menuOffset : number          = 0;
    @Input() theme      : string          = 'forms';
    @Input() sectionsToHide : string[]    = [];
    public showMenu     : boolean         = false;
    private sections                      = [];
    private currentSectionId : string     = null;
    private domUtils : DomUtils           = null;
    private itemPrefix : string           = 'Item-'; // Prefix for the nav menu id.
    private isOpen : boolean              = false;
    private currentSectionLabel : string = '';
    private tempScrollTop : number;
    private sectionObservable : Observable<any>;
    private scrollSubscription : Subscription;
    private menuScrolling : boolean = false;
    private openClosed : string = 'closed';
    private html; // get a reference to html element so we can stop scrolling when menu open on mobile
    constructor ( private dom : BrowserDomAdapter,
                  private cd : ChangeDetectorRef,
                  private scrollService : ScrollService ) {
        this.domUtils          = new DomUtils();
        this.sectionObservable = scrollService.$scrolled;
    }

    ngOnInit () : any {
        this.sectionObservable.subscribe( ( blockchanges ) => {
            let sectionName = blockchanges ? blockchanges.componentSelector : null;
            setTimeout( () => {
                this.updateSections( sectionName );
            }, 0 );
        } );
        this.html = this.dom.query( 'html' );
    }

    ngAfterViewInit () {
        this.onResize( window, this.menu );
        this.subscribeToScrollEvents();
    }

    ngOnDestroy () {
        this.unSubscribeFromEvents();
    }

    private isStateDisabled ( state : string ) {
        return state.indexOf( 'visited' ) === - 1 && state.indexOf( 'active' ) === - 1;
    }

    private isStateActive ( state : string ) {
        return state.indexOf( 'active' ) > - 1;
    }

    /**
     *
     * On scrolled event, update the sections and then put them into the collection along with the custom names for the menu.
     * This function will look for all the page sections which has a custom label defined in the DOM and it
     * parses and stores in the component sections array object.
     */
    private updateSections ( sectionName : string ) {
        let body               = this.dom.query( 'body' );
        let sections           = this.dom.querySelectorAll( body, 'page-section' );
        let hasActiveClass     = false;
        let currentSectionName = sectionName ? sectionName : this.currentSectionId;
        this.sections          = Array.prototype.map.call( sections, ( section ) => {
            let pageSectionId = section.id;
            let menuItemId    = this.itemPrefix + section.id;
            let classes       = section.className;
            let label         = section.getAttribute( 'label' );
            let hidden = this.sectionsToHide.indexOf(pageSectionId) !== -1;
            if ( ! hasActiveClass && currentSectionName && currentSectionName.indexOf( pageSectionId ) > - 1 ) {
                classes               = classes ? classes + ' active' : 'active';
                this.currentSectionId = pageSectionId;
                hasActiveClass        = true;
                this.currentSectionLabel = label;
            }
            return {
                label,
                pageSectionId,
                id            : menuItemId,
                state         : classes,
                anchorUrl     : window.location.href + '/#' + pageSectionId,
                hidden
            };
        } );
        if ( this.sections.length && hasActiveClass ) {
            this.showMenu = true;
        }
        this.cd.markForCheck();
    }

    private close () {
        this.allowHtmlScrolling();
        this.openClosed = 'closed';
        this.isOpen = false;
    }

    private open () {
        this.disableHtmlScrolling();
        this.isOpen   = true;
        this.openClosed = 'open';
        this.tempScrollTop = this.scrollService.scrollTop;
    }

    private onOpenClick () {
        this.open();
    }

    private onCloseClick () {
        this.close();
    }

    private onSectionClick ( event, section ) {
        event.preventDefault();
        this.scrollToSection(section);
        this.close();
    }

    private scrollToSection ( section ) {
        this.currentSectionId = section.pageSectionId;
        this.menuScrolling = true;
        this.scrollService.scrollToComponentSelector( section.pageSectionId );
    }

    private allowHtmlScrolling () {
        this.html.style.overflow = '';
    }

    private disableHtmlScrolling () {
        this.html.style.overflow = 'hidden';
    }

    private onResize ( _window, menu : HTMLElement ) {
        let menuHeight = menu && menu.getBoundingClientRect ? menu.getBoundingClientRect().height : 65;
        if ( _window.innerWidth < 481 ) {
            this.scrollService.updateOffset( menuHeight );
        } else {
            this.scrollService.updateOffset( this.menuOffset );
        }
    }

    private subscribeToScrollEvents () {
        this.scrollSubscription = this.scrollService.$scrolled.subscribe( ( component ) => {
            if (this.menuScrolling) {
                let body = this.dom.query( 'body' );
                let section = this.dom.querySelector( body, '#' + component.componentSelector );
                let tabindex = section.getAttribute('tabindex');

                this.menuScrolling = false;

                if (tabindex && tabindex !== '0') {
                    section.focus();
                } else {
                    setTimeout(() => {
                        this.dom.querySelector( body, 'a[href$="#' + component.componentSelector + '"]').focus();
                    });
                }
            }
        } );
    }

    private unSubscribeFromEvents () {
        if ( this.scrollSubscription ) {
            this.scrollSubscription.unsubscribe();
        }
    }
}
