import {
    Component ,
    ElementRef ,
    ChangeDetectorRef ,
    ViewChild ,
    ChangeDetectionStrategy ,
    OnInit ,
    AfterViewInit ,
    OnDestroy ,
    Input
} from '@angular/core';
import { FormSectionService } from '../../../../services/form-section/form-section.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
@Component( {
    selector        : 'amp-standalone-menu' ,
    template        : require( './amp-standalone-menu.component.html' ).toString() ,
    styles          : [ require( './amp-standalone-menu.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpStandAloneMenuComponent implements OnInit , AfterViewInit , OnDestroy {
    @ViewChild( 'menu' ) menu;
    // Selector of the main page content to show/hide content in mobile view.
    @Input() mainContentSelector : string = 'main';
    @Input() menuOffset : number          = 0;
    @Input() theme      : string          = '';
    public showMenu     : boolean         = false;
    private sections                      = [];
    private currentSectionId : string     = null;
    private domUtils : DomUtils           = null;
    private itemPrefix : string           = 'Item-'; // Prefix for the nav menu id.
    private isClassOpen : boolean         = false;
    private currentSectionLabel : string = '';
    private tempScrollTop : number;
    private sectionObservable : Observable<any>;
    private scrollSubscription : Subscription;
    private menuScrolling : boolean = false;
    private sectionsToHide : Array<string> = [];
    private html; // get a reference to html element so we can stop scrolling when menu open on mobile
    constructor ( private dom : BrowserDomAdapter ,
                  private cd : ChangeDetectorRef ,
                  private scrollService : ScrollService ) {
        this.domUtils          = new DomUtils();
        this.sectionObservable = scrollService.$scrolled;
    }

    ngOnInit () : any {
        this.sectionObservable.subscribe( ( blockchanges ) => {
            let sectionName = blockchanges ? blockchanges.section : null;
            setTimeout( () => {
                this.updateSections( sectionName );
            } , 0 );
        } );
        this.html = this.dom.query( 'html' );
    }

    ngAfterViewInit () {
        this.onResize( window , this.menu );
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
        let sections           = this.dom.querySelectorAll( body , 'page-section' );
        let mySections         = [];
        let hasActiveClass     = false;
        let currentSectionName = sectionName ? sectionName : this.currentSectionId;
        this.sections          = Array.prototype.map.call( sections , ( section , index ) => {
            let pageSectionId = section.id;
            let menuItemId    = this.itemPrefix + section.id;
            let classes       = section.className;
            let label         = section.getAttribute( 'label' );
            let hidden = this.sectionsToHide.indexOf(pageSectionId) !== -1;
            if ( ! hasActiveClass && currentSectionName && pageSectionId.indexOf( currentSectionName ) > - 1 ) {
                classes               = classes ? classes + ' active' : 'active';
                this.currentSectionId = pageSectionId;
                hasActiveClass        = true;
                this.currentSectionLabel = label;
            }
            return {
                label         : label ,
                pageSectionId : pageSectionId ,
                id            : menuItemId ,
                state         : classes ,
                anchorUrl     : window.location.href + '/#' + pageSectionId,
                hidden        : hidden
            };
        } );
        if ( this.sections.length && hasActiveClass ) {
            this.showMenu = true;
        }
        this.cd.markForCheck();
    }

    private onClassOpen () {
        this.disableHtmlScrolling();
        this.isClassOpen   = true;
        this.tempScrollTop = this.scrollService.scrollTop;
    }

    private onClassClose () {
        this.allowHtmlScrolling();
        this.isClassOpen = false;
    }

    private scrollToSection ( event , section ) {
        event.preventDefault();
        this.allowHtmlScrolling();
        this.isClassOpen      = false;
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

    private onResize ( _window , menu : HTMLElement ) {
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
                let section = this.dom.querySelector( body , '#' + component.componentSelector );
                let tabindex = section.getAttribute('tabindex');

                this.menuScrolling = false;

                if (tabindex && tabindex !== '0') {
                    section.focus();
                } else {
                    setTimeout(() => {
                        this.dom.querySelector( body , 'a[href$="#' + component.componentSelector + '"]').focus();
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
