import {
    ElementRef ,
    ChangeDetectorRef ,
    AfterViewInit ,
    OnDestroy ,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    arrayJoinByDash ,
    DomUtils
} from './modules/amp-utils';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormModelService } from './services/form-model/form-model.service';
import { ProgressObserverService } from './services/progress-observer/progress-observer.service';
import { ScrollService } from './services/scroll/scroll.service';

export abstract class FormBlock implements AfterViewInit, OnDestroy {
    public autoFocusOn;
    protected isInSummaryState : boolean     = false;
    protected isActive : boolean             = false;
    protected hasClickedOnOkButton : boolean = false;
    protected selectorName : string          = 'default-form-block-selector-name';
    protected noScroll                       = false;
    protected __fdn : (number|string)[];
    protected __form : FormGroup;
    protected __controlGroup : FormGroup;
    protected __sectionName : string;
    protected __removeNext : (viewContainerRef : ViewContainerRef) => void;
    protected __loadNext : (def : any , viewContainerRef : ViewContainerRef) => void ;
    protected __loadAt : (def : any , index : number) => void;
    protected __removeAt : ( index : number ) => void;
    protected __custom : any;
    protected visibleFlag : string           = 'defaultIsVisible';
    protected doneFlag : string              = 'defaultIsDone';
    private scrollSubscription : Subscription;
    private domUtils : DomUtils = null;

    constructor ( protected formModelService : FormModelService ,
                  protected elementRef : ElementRef ,
                  protected _cd : ChangeDetectorRef ,
                  protected progressObserver : ProgressObserverService ,
                  protected scrollService : ScrollService ) {
        this.domUtils = new DomUtils();
    }

    context () {
        return this;
    }

    ngAfterViewInit () {
        this.selectorName = arrayJoinByDash( this.__fdn ) + '-block';
        this.visibleFlag  = this.selectorName + 'IsVisible';
        this.doneFlag     = this.selectorName + 'IsDone';
        this.subscribeToScrollEvents();
        this._cd.markForCheck();
    }

    ngOnDestroy () {
        this.unSubscribeFromScrollEvents();
    }

    updateSelectorName ( _customString : string|number ) {
        this.selectorName += '-' + _customString;
    }

    autoFocus () {
        /*
         * TODO : This should be a directive or something else.
         * */
        setTimeout( () => {
            if ( this.autoFocusOn ) {
                this.autoFocusOn.focus();
            } else {
                let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
                if ( ! inputs ) {
                    inputs = this.elementRef.nativeElement.getElementsByTagName( 'textarea' );
                    if ( ! inputs ) {
                    } else {
                        inputs = this.elementRef.nativeElement.getElementsByTagName( 'select' );
                    }
                }
                if ( inputs && inputs.length > 0 ) {
                    for ( let i = 0; i < inputs.length; i++ ) {
                        if ( this.domUtils.isVisible( inputs[ i ] ) ) {
                            inputs[ i ].focus();
                            break;
                        }
                    }
                }
            }
        } , 100 );
    }

    onEdit () {
        this.isInSummaryState = false;
        this.scrollService.$scrolled.emit( this.selectorName );
    }

    onNext () {
        if ( this.canGoNext ) {
            this.scrollService.scrollToNextUndoneBlock( this.__form);
            this.progressObserver.onProgress( this.__fdn );
            this.formModelService.save( this.__form.value );
            setTimeout( () => {
                this.isInSummaryState = true;
                this._cd.markForCheck();
            } , 1200 );
        }
    }

    get canGoNext () {
        return this.__controlGroup.valid;
    }

    protected subscribeToScrollEvents () {
        if ( ! this.noScroll ) {
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

    private resetBlock () {
        this.isInSummaryState = false;
    }

    private unSubscribeFromScrollEvents () {
        if ( this.scrollSubscription ) {
            this.scrollSubscription.unsubscribe();
        }
    }
}
