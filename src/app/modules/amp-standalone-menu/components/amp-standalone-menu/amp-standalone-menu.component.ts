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
    animations      : [
        trigger(
            'openClosed',
            [
                state( 'closed, void', style( {
                    height : '*'
                } ) ),
                state( 'open', style( {
                    height : '100%'
                } ) ),
                transition(
                    'closed <=> open', [ animate( '450ms ease-in' ) ] )
            ] )
    ],
    host : {
        '[class.menu--is-not-sticky]': '!isSticky',
    }
} )
export class AmpStandAloneMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild( 'menu' ) menu;
    // Selector of the main page content to show/hide content in mobile view.
    @Input() mainContentSelector : string = 'main';
    @Input() menuOffset : number          = 0;
    @Input() theme : string               = 'forms';
    @Input() sectionsToHide : string[]    = [];
    @Input() containInside : string       = 'menu-frame';
    @Input() isSticky : boolean           = true;
    public showMenu : boolean             = false;
    private sections                      = [];
    private currentSectionId : string     = null;
    private domUtils : DomUtils           = null;
    private itemPrefix : string           = 'Item-'; // Prefix for the nav menu id.
    private isOpen : boolean              = false;
    private currentSectionLabel : string  = '';
    private tempScrollTop : number;
    private sectionObservable : Observable<any>;
    private scrollSubscription : Subscription;
    private menuScrolling : boolean       = false;
    private openClosed : string           = 'closed';
    private html; // get a reference to html element so we can stop scrolling when menu open on mobile
    private menuPosition : string         = '';
    constructor ( private dom : BrowserDomAdapter,
                  private cd : ChangeDetectorRef,
                  private scrollService : ScrollService ) {
        this.domUtils          = new DomUtils();
        this.sectionObservable = scrollService.$scrolled;
    }

    public ngOnInit () : any {
        this.sectionObservable.subscribe( ( blockchanges ) => {
            let sectionName = blockchanges ? blockchanges.componentSelector : null;
            setTimeout( () => {
                this.updateSections( sectionName );
            }, 0 );
        } );
        this.html = this.dom.query( 'html' );
    }

    public ngAfterViewInit () {
        this.onResize( window, this.menu );
        this.subscribeToScrollEvents();
    }

    public ngOnDestroy () {
        this.unSubscribeFromEvents();
    }

    private isStateDisabled ( state : string ) {
        return state.indexOf( 'visited' ) === -1 && state.indexOf( 'active' ) === -1;
    }

    private isStateActive ( state : string ) {
        return state.indexOf( 'active' ) > -1;
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
            let isATab        = section.getAttribute( 'tab' );
            let hidden        = this.sectionsToHide.indexOf( pageSectionId ) !== -1;
            if ( !hasActiveClass && currentSectionName && currentSectionName.indexOf( pageSectionId ) > -1 ) {
                classes                  = classes ? classes + ' active' : 'active';
                this.currentSectionId    = pageSectionId;
                hasActiveClass           = true;
                this.currentSectionLabel = label;
            }
            return {
                label,
                pageSectionId,
                isATab,
                id        : menuItemId,
                state     : classes,
                anchorUrl : window.location.href + '/#' + pageSectionId,
                hidden
            };
        } );
        if ( this.sections.length && hasActiveClass ) {
            this.showMenu = true;
            this.domUtils.addClass(body, 'show-menu');
            setTimeout(() => {
                this.setupContainingElement();
                this.setMenuPosition();
            });
        }
        this.cd.markForCheck();
    }

    private close () {
        this.allowHtmlScrolling();
        this.openClosed = 'closed';
        this.isOpen     = false;
    }

    private open () {
        this.disableHtmlScrolling();
        this.isOpen        = true;
        this.openClosed    = 'open';
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
        this.scrollToSection( section );
        this.close();
    }

    private scrollToSection ( section ) {
        this.currentSectionId = section.pageSectionId;
        this.menuScrolling    = true;
        if ( section.isATab === 'true' ) {
            this.scrollService.scrollToComponentSelector( section.pageSectionId, null, 0, true ); // mock th scroll
        } else {
            this.scrollService.scrollToComponentSelector( section.pageSectionId );
        }
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

    private onScroll () {
        this.setMenuPosition();
    }

    private getContainingElement () {
        const menu = this.menu.nativeElement;
        const containingElement = this.domUtils.closest( menu, this.containInside );

        if ( containingElement ) {
            return containingElement;
        }
        return false;
    }

    private setupContainingElement () {
        const containingElement = this.getContainingElement();
        let styles;

        if ( !containingElement ) {
            return false;
        }

        styles = window.getComputedStyle(containingElement);

        if ( styles ) {
            if ( styles.position === 'static' ) {
                containingElement.style.position = 'relative';
            }
            if ( styles.display === 'inline' ) {
                containingElement.style.display = 'block';
            }
        }
    }

    private setMenuPosition () {
        const menu = this.menu.nativeElement;
        const containingElement = this.getContainingElement();

        if ( containingElement && this.isSticky ) {
            const stickyClass           = 'steps-menu--sticky';
            const bottomClass           = 'steps-menu--bottom';
            let scrollY                 = window.scrollY || window.pageYOffset;
            let containingElementY      = containingElement.offsetTop;
            let containingElementHeight = containingElement.offsetHeight;
            let menuHeight              = this.menu.nativeElement.offsetHeight;
            let position                = 'top';

            if ( scrollY <= containingElementY ) {
                position = 'top';
            } else if ( scrollY < (containingElementY + containingElementHeight - menuHeight) ) {
                position = 'middle';
            } else {
                position = 'bottom';
            }

            if (this.menuPosition !== position) {
                this.menuPosition = position;

                switch (position) {
                    case 'bottom':
                        this.domUtils.removeClass(menu, stickyClass);
                        this.domUtils.addClass(menu, bottomClass);
                        break;
                    case 'middle':
                        this.domUtils.removeClass(menu, bottomClass);
                        this.domUtils.addClass(menu, stickyClass);
                        break;
                    default:
                        this.domUtils.removeClass(menu, stickyClass);
                        this.domUtils.removeClass(menu, bottomClass);
                }
            }
        }
    }

    private subscribeToScrollEvents () {
        this.scrollSubscription = this.scrollService.$scrolled.subscribe( ( component ) => {
            if ( this.menuScrolling ) {
                let body     = this.dom.query( 'body' );
                let section  = this.dom.querySelector( body, '#' + component.componentSelector );
                let tabindex = section.getAttribute( 'tabindex' );

                this.menuScrolling = false;

                if ( tabindex && tabindex !== '0' ) {
                    section.focus();
                } else {
                    setTimeout( () => {
                        this.dom.querySelector( body, 'a[href$="#' + component.componentSelector + '"]' ).focus();
                    } );
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
