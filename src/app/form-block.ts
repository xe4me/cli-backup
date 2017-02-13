import {
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { arrayJoinByDash } from './modules/amp-utils';
import { Subscription } from 'rxjs';
import { SaveService } from './services/save/save.service';
import { ScrollService } from './services/scroll/scroll.service';
import { AutoFocusOnDirective } from './modules/amp-directives/directives/auto-focus-on/auto-focus-on.directive';
import { Environments, BlockLoaderAbstracts } from './abstracts';

export abstract class FormBlock extends BlockLoaderAbstracts implements AfterViewInit, OnDestroy {
    @ViewChild( AutoFocusOnDirective ) public autoFocusOn;

    protected isInSummaryState : boolean = false;
    protected isActive : boolean         = false;
    protected isAlive : boolean          = true;
    protected selectorName : string      = 'default-form-block-selector-name';
    protected noScroll                   = false;
    private scrollSubscription : Subscription;
    private autoSave : boolean           = true;

    constructor( protected saveService : SaveService,
                 protected _cd : ChangeDetectorRef,
                 protected scrollService : ScrollService ) {
        super();
    }

    public context() {
        return this;
    }

    public ngAfterViewInit() {
        this.selectorName = arrayJoinByDash( this.__fdn ) + '-block';
        this.subscribeToScrollEvents();
        if ( this.__isRetrieved && this.canGoNext ) {
            this.setToTouchedAndSummaryState();
        }
        this._cd.markForCheck();
        this._cd.detectChanges();
    }

    public ngOnDestroy() {
        this.isAlive = false;
        this.unSubscribeFromEvents();
    }

    public autoFocus() {
        setTimeout( () => {
            if ( this.autoFocusOn ) {
                this.autoFocusOn.focus();
            }
        }, 100 );
    }

    public onEdit() {
        this.isInSummaryState = false;
    }

    public setToTouchedAndSummaryState() {
        this.__controlGroup.markAsTouched();
        this.isInSummaryState = true;
        this.isActive         = true;
    }

    beforeOnNext() {

    }

    onNext () {
        this.beforeOnNext();
        this.track();
        // Do not block the onNext function based on whether or not the block is Touched
        if ( this.__controlGroup ) {
            this.__controlGroup.markAsTouched();
        }

        if ( this.canGoNext ) {
            this.scrollService.scrollToNextUndoneBlock( this.__form );
            if ( this.saveService.autoSave && this.autoSave ) {
                this.saveService.save( this.__form.value );
            }
            let onNextScrolled = this.scrollService.$scrolled.subscribe( () => {
                this.isInSummaryState = true;
                this._cd.markForCheck();
                onNextScrolled.unsubscribe();
            } );
        }
    }

    public get canGoNext() {
        return this.__controlGroup && this.__controlGroup.valid;
    }

    protected disableAutoSave() {
        this.autoSave = false;
    }

    protected enableAutoSave() {
        this.autoSave = true;
    }

    protected subscribeToScrollEvents() {
        if ( !this.noScroll ) {
            this.scrollSubscription = this.scrollService.$scrolled.subscribe( ( changes ) => {
                if ( changes.componentSelector && changes.componentSelector === this.selectorName ) {
                    this.isInSummaryState = false;
                    this.isActive         = true;
                    this.autoFocus();
                    this._cd.markForCheck();
                }
            } );
        }
    }

    private unSubscribeFromEvents() {
        if ( this.scrollSubscription ) {
            this.scrollSubscription.unsubscribe();
        }
    }

    /**
     * This method is an abstraction of the track method available with ewt object which is analytics tracker object.
     * This object is loaded with an external script coming from the provider's server.
     *
     * To have access to this object you need to have this piece of code into you index.html of your exeperience
     * <script src='https://www.sc.pages03.net/lp/static/js/iMAWebCookie.js?18560ebc-14a40f8eab9-943e27de0c8b91cc3fcf1475c3e5d726&amp;h=www.pages03.net'></script>
     * <script type=text/javascript>
     *  window.onload = function() {
     *     ewt.init ();
     *  }
     * </script>
     */
    private track() {
        if ( (<any> window).ewt ) {
            (<any> window).ewt.track( {
                name : this.__name,
                type : Environments.property.ExperienceName,
                link : null
            } );
        } else {
            console.warn( 'ewt object is not properly loaded' );
        }
    }

}
