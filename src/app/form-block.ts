import { ElementRef , ChangeDetectorRef , AfterViewInit , OnDestroy , ViewChild } from '@angular/core';
import { arrayJoinByDash } from './modules/amp-utils';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormModelService } from './services/form-model/form-model.service';
import { ProgressObserverService } from './services/progress-observer/progress-observer.service';
import { ScrollService } from './services/scroll/scroll.service';
export abstract class FormBlock implements AfterViewInit, OnDestroy {
    @ViewChild( 'focusZone' ) focusZone;
    protected isInSummaryState : boolean     = false;
    protected isActive : boolean             = false;
    protected hasClickedOnOkButton : boolean = false;
    protected selectorName : string          = 'default-form-block-selector-name';
    protected visibleFlag : string           = 'defaultIsVisible';
    protected doneFlag : string              = 'defaultIsDone';
    protected noScroll                       = false;
    protected __fdn : (number|string)[];
    protected __form : FormGroup;
    protected __controlGroup : FormGroup;
    protected __removeNext : Function;
    protected __loadNext : Function;
    protected __loadAt : Function;
    protected __removeAt : Function;
    protected __custom : any;
    private scrollSubscription : Subscription;

    constructor ( protected formModelService : FormModelService ,
                  protected elementRef : ElementRef ,
                  protected _cd : ChangeDetectorRef ,
                  protected progressObserver : ProgressObserverService ,
                  protected scrollService : ScrollService ) {
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
            let inputs = this.elementRef.nativeElement.getElementsByTagName( 'input' );
            if ( ! inputs ) {
                inputs = this.elementRef.nativeElement.getElementsByTagName( 'textarea' );
                if ( ! inputs ) {
                } else {
                    inputs = this.elementRef.nativeElement.getElementsByTagName( 'select' );
                }
            }
            if ( inputs && inputs.length > 0 ) {
                inputs[ 0 ].focus();
            }
        } , 100 );
    }

    onEdit () {
        this.isInSummaryState = false;

        this.scrollService.$scrolled.emit(this.selectorName);
    }

    onNext () {
        if ( this.canGoNext ) {
            this.scrollService.scrollToNextUndoneBlock( this.__form );
            this.progressObserver.onProgress( this.__fdn );
            this.formModelService.save(this.__form.value);
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
                if ( changes === this.selectorName ) {
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
